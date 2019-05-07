var express = require('express');
var router = express.Router();
const Place = require('./../models/place');
const authMiddlewares = require('../middlewares/auth.middelware');

/* GET users listing. */
router.get('/private', authMiddlewares.checkIfAuthenticated, (req, res, next) => {
  res.render("auth/private", { user: req.user }
  )
});

module.exports = router;