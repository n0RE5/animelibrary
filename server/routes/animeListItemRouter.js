const Router = require('express')
const router = new Router()
const animeListItemController = require('../controllers/animeListItemConroller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), animeListItemController.create)
router.post('/:id', checkRole('ADMIN'), animeListItemController.removeFromList)
router.get('/', animeListItemController.getAll)
router.get('/:animelistId', animeListItemController.getFromList)

module.exports = router