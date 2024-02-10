const express = require('express')

const controller = require('../controllers/UserController');

const router = express.Router()

const path = 'user'

router.get(`/${path}`, controller.getUsers)
router.post(`/${path}`, controller.addUser)
router.put(`/${path}/:id`, controller.updateUser)
router.delete(`/${path}/:id`, controller.deleteUser)
router.post(`/${path}/login`, controller.login)
router.post(`/${path}/qr`, controller.getQr)
router.post(`/${path}/token`, controller.compareToken)

module.exports = router