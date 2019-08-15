const express = require('express')
const router = express.Router()
const authRouter = require('./auth-routes')
const searchPlaceRouter = require('./search-place')
const userRouter = require('./user.js')
const matchRouter = require('./match-route.js')
const matchDisplayRouter = require('./match-display.js')

const { isLoggedIn } = require('../middlewares/authMiddelwares')

// *  '/'
router.use('/auth', authRouter)
router.use('/places', searchPlaceRouter)
router.use('/profile', userRouter)
router.use('/create-match', matchRouter)
router.use('/display-match', matchDisplayRouter)

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index', { title: 'Cozy Places' })
})

module.exports = router
