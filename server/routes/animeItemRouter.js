const Router = require('express')
const router = new Router()
const animeItemController = require('../controllers/animeItemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), animeItemController.create)
router.post('/:id', checkRole('ADMIN'), animeItemController.remove)
router.get('/', animeItemController.getAll)
router.get('/:id', animeItemController.getOne)

module.exports = router