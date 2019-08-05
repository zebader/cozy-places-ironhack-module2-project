var express = require('express')
var router = express.Router()
const User = require('./../models/user')

const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddelwares')

/* GET users listing. */
router.get('/private', isNotLoggedIn, (req, res, next) => {
  // User.create()
  User.findOne({ _id: req.session.currentUser._id })
    .then(userObj => {
      res.render('auth/private', { user: userObj })
    })
})

module.exports = router
