const express = require("express");
const router = express.Router();
const axios = require('axios');
const config = require('./../config/config');
const Place = require('../models/place');

router.get("/place-profile/:id", (req, res, next) => {

  const API_id = {
    API_id:req.params.id
  }

  axios.get(`https://api.foursquare.com/v2/venues/${API_id.API_id}`,{
    params: {
      client_id: config.client_id,
      client_secret: config.client_secret,
      v: '20180323'
    }
  }).then( (response) => {


    const data = {
      data: response.data.response.venue
    }
    console.log('photos' , response.data.response.venue.photos.groups[1].items)

    res.render('apitest/place-profile',  data  )
  })
  .catch((error) => {
    next(error)
  })

/*   axios.get(`https://api.foursquare.com/v2/venues/${API_id.API_id}/similar`,{
    params: {
      client_id: config.client_id,
      client_secret: config.client_secret,
      v: '20180323'
    }
  }).then( (response) => {
    const similar = {
      similar:response.data.response.similarVenues.items
    }

    Place.findOne(API_id)
    .then( (place) => res.render('apitest/place-profile', { place,similar } ))
    .catch( (err) => console.log(err));
  })
  .catch((error) => {
    next(error)
  })  */

  });

module.exports = router;