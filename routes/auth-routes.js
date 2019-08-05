'use strict'
const express = require('express')
const router = express.Router()
const User = require('../models/user')

const bcrypt = require('bcrypt')
const saltRounds = 10

const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddelwares')

// Not using sign up for the moment
//
router.get('/signup', isLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('errorFormNotFilled')
  }
  res.render('auth/signup', data)
})

router.post('/signup', isLoggedIn, isFormFilled, async (req, res, next) => {
  try {
    const { username, password } = req.body

    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const user = await User.findOne({ username })

    if (!user) {
      const newUser = await User.create({
        username,
        password: hashedPassword
      })

      req.session.currentUser = newUser
      return res.redirect('/')
    }
    res.redirect('/auth/signup')
  } catch (error) {
    next(error)
  }
})
//
// Not using sign up for the moment

router.get('/login', isLoggedIn, (req, res, next) => {
  res.render('auth/login')
})

router.post('/login', isLoggedIn, isFormFilled, async (req, res, next) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const JesushashedPassword = bcrypt.hashSync('Jesus', salt)

  const USER_JESUS = {
    username: 'Jesus',
    password: JesushashedPassword
  }

  const { username, password } = req.body
  try {
    // const user = await User.findOne({ username });
    if (username !== USER_JESUS.username && password !== USER_JESUS.password) {
      return res.render('login', { error: 'User dosent exits' })
    }
    if (bcrypt.compareSync(password, USER_JESUS.password)) {
      req.session.currentUser = USER_JESUS
      res.redirect('/private')
    } else {
      res.redirect('/auth/login')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', isNotLoggedIn, (req, res, next) => {
  delete req.session.currentUser
  res.redirect('/auth/login')
})

module.exports = router
