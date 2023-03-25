const Router = require('express')
const router = new Router()
const UserWatchListController = require('../controllers/userWatchListController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, UserWatchListController.userwatchlist_fill)
router.post('/remove', authMiddleware, UserWatchListController.userwatchlist_remove)
router.get('/:userWatchlistId', authMiddleware, UserWatchListController.userwatchlist_get)
router.get('/get/:userId', authMiddleware, UserWatchListController.watchlist_find)

module.exports = router