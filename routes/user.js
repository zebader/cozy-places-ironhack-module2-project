var express = require('express')
var router = express.Router()
const User = require('./../models/user')

const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddelwares')

/* GET users listing. */
router.get('/profile', isNotLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser
  console.log(req.session.currentUser)
  try {
    const user = await User.findById(_id)
    console.log(user.username)
    res.render('auth/private', user)
  } catch (error) {
  }
})

module.exports = router
