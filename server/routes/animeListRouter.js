const Router = require('express')
const router = new Router()
const animeListController = require('../controllers/animeListController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), animeListController.create)
router.get('/', animeListController.getAll)
router.get('/:id', animeListController.getOne)

module.exports = router