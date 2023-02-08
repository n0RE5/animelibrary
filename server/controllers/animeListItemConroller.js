const {animelist_anime, animeitem, animelist, animeitem_stats} = require('../models/models')
const ApiError = require('../error/apiError')

class AnimeListItemController {

    async create (req, res, next) {
            const {animelistId, animeitemId} = req.body

            const list_exists = await animelist.findOne({where: {id: animelistId}})

            if(!list_exists) {
                return next(ApiError.badRequest(`Списка с таким ID не существует`))
            }

            const contains = await animelist_anime.findOne({where: {animelistId, animeitemId}})

            if(contains) {  
                return next(ApiError.badRequest(`Список уже содержит аниме с ID: ${animeitemId}`))
            }

            const exists = await animeitem.findOne({where: {id: animeitemId}})

            if(!exists) {
                return next(ApiError.badRequest(`Аниме с таким ID не существует`))
            }

            const animeListItem = await animelist_anime.create({animelistId, animeitemId})
            return res.json(animeListItem)
    }

    async getAll(req, res, next) {
        const animeListItems = await animelist_anime.findAndCountAll({
            include: [{model: animeitem, as: 'animeitem', include: [{model: animeitem_stats, as: "stats"}]}]
        })
        return res.json(animeListItems)
    }

    async getFromList(req, res, next) {
        const {animelistId} = req.params
        const animeListItem = await animelist_anime.findAndCountAll({
            where: {animelistId},
            include: [{model: animeitem, as: 'animeitem', include: [{model: animeitem_stats, as: "stats"}]}]
        })
        return res.json(animeListItem)
    }

    async removeFromList(req, res, next) {
            const {id} = req.params
            if (!id) {
                return next(ApiError.badRequest(`Укажите ID аниме которое следует удалить`))
            }
            const animeListItem = await animelist_anime.destroy({where: {id}})
            return res.json(animeListItem)
    }
}

module.exports = new AnimeListItemController()