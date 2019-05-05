const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const request = require('request');
const Place = require('./../models/Place');



// router.get('/', (req, res, next) => {
//   res.render('/');
// });

//---------------------SHOW--------------------
// GET '/places'
router.get('/', (req, res, next) => {
  const request = require('request');
  request({
    url: 'https://api.foursquare.com/v2/venues/explore',
    method: 'GET',
    qs: {
      client_id: 'VLHOZSCEVHIBF2LRATBWBEDIVIS0IXNIBNF3SROZ4KEUNTWZ',
      client_secret: 'DCOZT2HC0AKHUKY4V1LB5CREKRUFAV512VATLOCJBMBOQRDP',
      ll: '41.3704192,2.1709157',
      query: 'bar',
      v: '20180323',
      limit: 20
    }
  }, function(err, res, body) {
    if (err) {
      console.error(err);
    } else {
      // console.log("res: -----------------------------",res.body);
      // // Place.find({}) 
      // // .then (allPlaces =>{
        // const info = JSON.parse(body)
        //   const loc = info.headerLocation;
        //   console.log("headlocation",info);
          //   // console.log("headlocation",info.meta.requestId);
        //   // console.log("headlocation",info.response.totalResults);
        //   console.log("group length",info.response.groups[0].items.length);
        //   console.log("name ",info.response.groups[0].items[0].venue.name);
        //   console.log("address ",info.response.groups[0].items[0].venue.location.address);
        //   console.log("cp ",info.response.groups[0].items[0].venue.location.postalCode);
        // })
      }
      res.render('/')
      // const info = JSON.parse(body)

      // const id = info.meta.requestId;
      // const newPlace = new Place(id); //instantiate the object
      // newPlace
      // .save()
      // .then(res => {res.send('/'),
      // console.log("ai mama")})
      // .catch(err => console.log('error',err))
      //   console.log("address ",info.response.groups[0].items[0].venue.location.address
    })
    // .then(res.send('/placefinder',(request.body)), console.log('request.body',request.body));
    
    

});
module.exports = router;
