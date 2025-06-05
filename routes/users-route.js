const express = require('express')
const { register, login, getUsers, getUser, insertUser, updateUser, deleteUser } = require('../controller/users-controller')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

module.exports = router