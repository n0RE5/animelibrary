const ApiError = require('../error/apiError')
const {rating, animeitem} = require('../models/models')

class ratingController {

    async rateAnime(req, res, next) {
        const {rate, userId, animeitemId} = req.body

        const alreadyExists = await rating.findOne({where: {userId, animeitemId}})

        if(alreadyExists) {
            return next(ApiError.badRequest('Вы уже оставили оценку для этого аниме'))
        }

        const Rate = await rating.create({rate, userId, animeitemId})

        return res.json({Rate})
    }

    async updateAnimeRating(req, res, next) {
        const {animeitemId} = req.params

        const animeRating = await rating.findAndCountAll({where: {animeitemId}})

        const avg = () => {
            let summ = 0
            for (let i = 0; i < animeRating.count; i++) {
                summ += animeRating.rows[i].dataValues.rate
            }
            const avg = summ/animeRating.count
            return parseFloat(avg.toFixed(1))
        }

        const average = avg()

        const updateAnime = await animeitem.update({rating: average},{where: {id: animeitemId}})

        return res.json({animeRating})
    }
}

module.exports = new ratingController()