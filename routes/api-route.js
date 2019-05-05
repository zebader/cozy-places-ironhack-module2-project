const express = require("express");
const router = express.Router();
const request = require('request');

router.post("/apitest", (req, res, next) => {
  const { location, placeName } = req.body;
  console.log('req.body', req.body);

  const locationF = {location}
  console.log('location', location);

  const placeNameF = {placeName}
  console.log('placeName', placeName);
  
  request({
    url: 'https://api.foursquare.com/v2/venues/search',
    method: 'GET',
    qs: {
      client_id: 'L3BM2ANUAFAAD1A3Z0AAXW5BBRTRUHRW4IWYBM2NZBFVFL4E',
      client_secret: '05FJRU2RUTOGNBJOHLXCYTRFAZUJFLHF0S1RYWB2WHVD4BJD',
      near: locationF,
      query: placeNameF,
      v: '20180323',
      limit: 1
    }
  }, (err, res, body) => {
    if (err) {
      console.error(err);
    } else {
      const info = JSON.parse(body)
      const placeID = info.response.venues[0].id;
      console.log('PlaceID', placeID);
    }
  }); 
  
  res.render("apitest/apitest");
});

router.get("/apitest", (req, res, next) => {
  res.render("apitest/apitest");
});
/* 
// get place ID ------------------------------------------

request({
  url: 'https://api.foursquare.com/v2/venues/search',
  method: 'GET',
  qs: {
    client_id: 'L3BM2ANUAFAAD1A3Z0AAXW5BBRTRUHRW4IWYBM2NZBFVFL4E',
    client_secret: '05FJRU2RUTOGNBJOHLXCYTRFAZUJFLHF0S1RYWB2WHVD4BJD',
    near: 'barcelona',
    query: 'pot petit',
    v: '20180323',
    limit: 1
  }
}, (err, res, body) => {
  if (err) {
    console.error(err);
  } else {
    const info = JSON.parse(body)
    const placeID = info.response.venues[0].id;
    console.log('PlaceID', placeID);
  }
}); 

// get photo ------------------------------------------

request({
  url: 'https://api.foursquare.com/v2/venues/4dbd4c3e815439392fad6a00',
  method: 'GET',
  qs: {
    client_id: 'L3BM2ANUAFAAD1A3Z0AAXW5BBRTRUHRW4IWYBM2NZBFVFL4E',
    client_secret: '05FJRU2RUTOGNBJOHLXCYTRFAZUJFLHF0S1RYWB2WHVD4BJD',
    near: '',
    name: '',
    v: '20180323',
    limit: 1
  }
}, (err, res, body) => {
  if (err) {
    console.error(err);
  } else {
    const info = JSON.parse(body)
    const prefixUrl = info.response.venue.photos.groups[1].items[0].prefix;
    const suffixUrl = info.response.venue.photos.groups[1].items[0].suffix;
    const widthUrl = info.response.venue.photos.groups[1].items[0].width;
    const heightUrl = info.response.venue.photos.groups[1].items[0].height;

    const imgUrl = `${prefixUrl}${widthUrl}x${heightUrl}${suffixUrl}`

    console.log('De aqui saco algo', imgUrl);
  }
}); */

router.get("/apitest", (req, res, next) => {
  res.render("apitest/apitest");
  });

module.exports = router;