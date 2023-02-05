const {user_watchlist, user_watchlist_anime, animeitem} = require('../models/models')
const ApiError = require('../error/apiError')

class UserWatchListController {

    async watchlist_find (req, res, next) {
            const {userId} = req.params
            if(!userId) {
                return next(ApiError.badRequest('Некорректно указан USER_ID'))
            }
            const watchList = await user_watchlist.findOne({where: {userId}})
            return res.json(watchList)
    }

    async userwatchlist_fill (req, res, next) {
            const {userWatchlistId, animeitemId} = req.body
            
            if(!userWatchlistId || !animeitemId) {
                return next(ApiError.badRequest('Некорректно указаны [UserWatchlistId] или [animeitemId]'))
            }

            const exists = await user_watchlist_anime.findOne({where: {userWatchlistId, animeitemId}})

            if(exists) {
                return next(ApiError.badRequest('Это аниме уже находится в вашем списке'))
            }

            const userWatchlistAnime = await user_watchlist_anime.create({userWatchlistId, animeitemId})
            return res.json(userWatchlistAnime)
    }

    async userwatchlist_get(req, res, next) {
        const {userWatchlistId} = req.params

        if(!userWatchlistId) {
            return next(ApiError.badRequest('Некорректно указаны [UserWatchlistId]'))
        }

        const userWatchlist = await user_watchlist_anime.findAndCountAll({
                where: {userWatchlistId},
                include: [{model: animeitem, as: 'animeitem'}]
        })

        return res.json(userWatchlist)

    }

    async userwatchlist_remove(req, res, next) {
            const {userWatchlistId, animeitemId} = req.body

            if(!userWatchlistId || !animeitemId) {
                next(ApiError.badRequest('Непредвиденная ошибка'))
            }

            const userWatchListAnime = await user_watchlist_anime.destroy({where: {userWatchlistId, animeitemId}})
            return res.json(userWatchListAnime)
    }
}

module.exports = new UserWatchListController()