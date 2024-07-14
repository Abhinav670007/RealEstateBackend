// to set up path to resolve it


const express = require('express')

const userControllers = require('../controllers/userController')
const  verifyToken  = require('../Utills/verifyUser')

const router = express.Router()

router.post('/signUp',userControllers.signUp)

router.post("/login",userControllers.login)

router.post('/google',userControllers.google)

router.post('/update/:id', verifyToken, userControllers.updateUser)

router.delete('/delete/:id',verifyToken, userControllers.deleteUser)

module.exports = router