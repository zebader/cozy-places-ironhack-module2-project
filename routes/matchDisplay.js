const express = require("express");
const router = express.Router();
const axios = require('axios');
const Place = require('./../models/place')
const User = require('./../models/user')
const Relation = require('./../models/relation')

router.get("/apitest/citySearch", (req, res, next) => {
  console.log('Hola');

  // const { location, placeName } = req.query;
  // return axios.get('https://api.foursquare.com/v2/venues/search',{
  //   params: {
  //     client_id: process.env.CLIENT_ID,
  //     client_secret: process.env.CLIENT_SECRET,
  //     near: location,
  //     query: placeName,
  //     v: '20180323',
  //     limit: 5
  //   }
  // }).then( (response) => {
  //   const venuesIDarray = response.data.response.venues;
  //   venuesIDarray.forEach((elem) => {
  //     elem.imgUrl = 'https://yt3.ggpht.com/a-/AAuE7mB5EQSMiXUOHnc4PZppYQQ0quToZJE7mKIocQ=s900-mo-c-c0xffffffff-rj-k-no';
  //   })
  //   res.render('apitest/placesList', {venuesIDarray})
  // })
  // .catch((error) => {
  //   next(error)
  // })
})
  
router.get("/apitest/citySearch", (req, res, next) => {
  res.render("apitest/apitest");
  });


module.exports = router;
