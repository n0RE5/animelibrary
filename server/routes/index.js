const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const animeItemRouter = require('./animeItemRouter')
const animeListRouter = require('./animeListRouter')
const animeListItemRouter = require('./animeListItemRouter')
const userWatchlistRouter = require('./userWatchListRouter')
const ratingRouter = require('./ratingRouter')

router.use('/user', userRouter)
router.use('/anime', animeItemRouter)
router.use('/animeList', animeListRouter)
router.use('/animeListItem', animeListItemRouter)
router.use('/watchlist', userWatchlistRouter)
router.use('/rating', ratingRouter)

module.exports = router