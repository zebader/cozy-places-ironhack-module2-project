'use strict'

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/private')
  }
  next()
}

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    req.flash('errorNotLoggedIn', 'You don\'t have access')
    return res.redirect('/')
  }
  next()
}

const isFormFilled = (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    req.flash('errorFormNotFilled', 'All fields are required')
    return res.redirect(req.originalUrl)
  }
  next()
}

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isFormFilled
}