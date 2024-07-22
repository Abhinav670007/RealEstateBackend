const ListController = require('../controllers/listing.Controller')
const  verifyToken  = require('../Utills/verifyUser')

const express = require('express')

const router = express.Router()


router.post('/Create',verifyToken, ListController.CreateListing)

router.get('/get/:id',verifyToken, ListController.getUserListing)

router.delete('/deleteList/:id',verifyToken, ListController.deleteUserList)

module.exports = router