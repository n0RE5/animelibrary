const {animeitem, animeitem_stats} = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')

class AnimeItemController {
    async create(req, res, next) {
        try {
            let {page_name, title, japanese_title, japan_title, status, year, type, genres, description, stats} = req.body
            const {img, gallery_1, gallery_2, gallery_3, gallery_4} = req.files

            if (!page_name || !title || !img || !img || !gallery_1 || !gallery_2 || !gallery_3 || !gallery_4 || !year || !type) {
                return next(ApiError.badRequest(`Обязательные поля не заполнены`))
            }

            let fileName = uuid.v4() + ".jpg"
            let fileName1 = uuid.v4() + ".jpg"
            let fileName2 = uuid.v4() + ".jpg"
            let fileName3 = uuid.v4() + ".jpg"
            let fileName4 = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            gallery_1.mv(path.resolve(__dirname, '..', 'static', fileName1))
            gallery_2.mv(path.resolve(__dirname, '..', 'static', fileName2))
            gallery_3.mv(path.resolve(__dirname, '..', 'static', fileName3))
            gallery_4.mv(path.resolve(__dirname, '..', 'static', fileName4))
            const anime = await animeitem.create({page_name, title, japanese_title, japan_title, status, year, type, genres, description, img: fileName, gallery_1: fileName1, gallery_2: fileName2, gallery_3: fileName3, gallery_4: fileName4})

            if(stats) {
                stats = JSON.parse(stats)
                stats.forEach(element => 
                    animeitem_stats.create({
                        stat_name: element.stat_name,
                        stat_value: element.stat_value,
                        stat_htmlTag: element.stat_htmlTag,
                        stat_link: element.stat_link,
                        animeitemId: anime.id
                    })
                )
            }
            console.log(stats)
            return res.json(anime)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        limit = limit || 10
        page = page || 1
        let offset = page * limit - limit
        let animeItems = await animeitem.findAndCountAll({include: [{model: animeitem_stats, as: 'stats'}], limit, offset})
        return res.json(animeItems)
    }

    async getOne(req, res, next) {
        const {id} = req.params

        if(isNaN(id)) {
            return next(ApiError.badRequest("ID Is not a number"))
        }

        const anime = await animeitem.findOne({
            where: {id},
            include: [{model: animeitem_stats, as: 'stats'}]

        })
        return res.json(anime)
    }
}

module.exports = new AnimeItemController()