var express = require('express');
var router = express.Router();
const User = require('./../models/user');

const authMiddlewares = require('../middlewares/auth.middelware');

/* GET users listing. */
router.get('/private', authMiddlewares.checkIfAuthenticated, (req, res, next) => {

  // User.create()
  User.findOne({_id: req.user._id})
  .then(userObj => { 
<<<<<<< HEAD
=======

>>>>>>> 0ffd75ff143c4648d813b57e850fdef6559405dd
    res.render("auth/private", { user: userObj })
  })
});

module.exports = router;