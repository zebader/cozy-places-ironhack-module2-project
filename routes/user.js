var express = require('express');
var router = express.Router();
const Place = require('./../models/place');
const User = require('./../models/user');

const authMiddlewares = require('../middlewares/auth.middelware');

/* GET users listing. */
router.get('/private', authMiddlewares.checkIfAuthenticated, (req, res, next) => {

  // User.create()
  User.findOne({_id: req.user._id})
  .then(userObj => { 

    res.render("auth/private", { user: userObj })
  })
});

module.exports = router;