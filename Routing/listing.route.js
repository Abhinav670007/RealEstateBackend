const ListController = require('../controllers/listing.Controller')
const  verifyToken  = require('../Utills/verifyUser')

const express = require('express')

const router = express.Router()


router.post('/Create', ListController.CreateListing)

module.exports = router