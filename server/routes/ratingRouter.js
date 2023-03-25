const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const ratingController = require('../controllers/ratingController')

router.post('/', authMiddleware, ratingController.rateAnime)
router.get('/:animeitemId', ratingController.updateAnimeRating)

module.exports = router