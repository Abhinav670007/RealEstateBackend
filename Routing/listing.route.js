const ListController = require('../controllers/listing.Controller')
const  verifyToken  = require('../Utills/verifyUser')

const express = require('express')

const router = express.Router()


router.post('/Create',verifyToken, ListController.CreateListing)

router.get('/gets',ListController.getListings)

router.get('/get/:id',verifyToken, ListController.getUserListing)

router.delete('/deleteList/:id',verifyToken, ListController.deleteUserList)

router.post('/update/:id',verifyToken,ListController.editUserList)

router.get('/getList/:id',ListController.getListing)

router.get('/:id',verifyToken,ListController.getUser)



module.exports = router