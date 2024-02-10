const express = require('express')

const controller = require('../controllers/BusController');

const router = express.Router()

const path = 'bus'

router.get(`/getBuses`, controller.getBuses)
router.post(`/addBuses`, controller.addBus)
router.put(`/updateBuses`, controller.updateBus)
router.delete(`/deleteBuses/:id`, controller.deleteBus)

module.exports = router