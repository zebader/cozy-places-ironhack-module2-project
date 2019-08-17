var express = require('express')
var router = express.Router()
const User = require('./../models/user')

const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddelwares')

/* GET users listing. */
router.get('/', isNotLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser
  try {
    const user = await User.findById(_id).populate('favoPlace')
    res.render('auth/private', user)
  } catch (error) {
  }
})

module.exports = router
