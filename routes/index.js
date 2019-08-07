const express = require('express')
const router = express.Router()
const authRouter = require('./auth-routes')
const searchPlaceRouter = require('./search-place')
const placeRouter = require('./place-profile')
const userRouter = require('./user.js')
const matchRouter = require('./match-route.js')
const matchDisplayRouter = require('./matchDisplay.js')

const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddelwares')

// *  '/'
router.use('/auth', authRouter)
router.use('/places', searchPlaceRouter)
router.use('/profile', userRouter)
router.use('/', placeRouter)
router.use('/', matchRouter)
router.use('/', matchDisplayRouter)

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index', { title: 'Cozy Places' })
})

module.exports = router
