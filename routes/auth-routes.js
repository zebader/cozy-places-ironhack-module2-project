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
  const message = data.messages
  res.render('auth/signup', { message })
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
  const data = {
    messages: req.flash('errorFormNotFilled')
  }
  const message = data.messages
  res.render('auth/login', { message })
})

router.post('/login', isLoggedIn, isFormFilled, async (req, res, next) => {
  const { username, password } = req.body
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = await User.findOne({ username })
  try {
    if (username !== user.username && hashedPassword !== user.password) {
      return res.render('auth/login', { error: 'User dosent exits' })
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user
      res.redirect('/profile')
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
