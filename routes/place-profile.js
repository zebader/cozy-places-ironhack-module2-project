const express = require("express");
const router = express.Router();
const axios = require('axios');
const config = require('./../config/config');
const Place = require('../models/place');

router.get("/place-profile", (req, res, next) => {
  const API_id = {
    API_id:'54246235498ec95dc8bc9dde'
  }

  Place.findOne(API_id)
  .then( (place) => res.render('apitest/place-profile', { place } ))
  .catch( (err) => console.log(err));
  });

module.exports = router;