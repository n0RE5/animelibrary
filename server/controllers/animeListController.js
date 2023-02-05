const {animelist, animelist_anime} = require('../models/models')
const ApiError = require('../error/apiError')

class AnimeListController {

    async create (req, res, next) {
        try {
            const {name} = req.body

            if(!name) {
                return next(ApiError.badRequest("Укажите имя для списка"))
            }

            const animeList = await animelist.create({name})
            return res.json(animeList)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        const animeLists = await animelist.findAndCountAll({
            include: [{model: animelist_anime, as: 'animeListItem'}]
        })
        return res.json(animeLists)
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const animeList = await animelist.findOne({
            where: {id},
            include: [{model: animelist_anime, as: 'animeListItem'}]
        })
        return res.json(animeList)
    }
}

module.exports = new AnimeListController()