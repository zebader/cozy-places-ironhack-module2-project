const express = require("express");
const router = express.Router();
const request = require('request');

router.post("/apitest", (req, res, next) => {
  const response = res;
  const { location, placeName } = req.body;
  console.log('req.body', { location, placeName });
  let placeID = null;
  request({
    url: 'https://api.foursquare.com/v2/venues/search',
    method: 'GET',
    qs: {
      client_id: 'L3BM2ANUAFAAD1A3Z0AAXW5BBRTRUHRW4IWYBM2NZBFVFL4E',
      client_secret: '05FJRU2RUTOGNBJOHLXCYTRFAZUJFLHF0S1RYWB2WHVD4BJD',
      near: location,
      query: placeName,
      v: '20180323',
      limit: 1
    }
  }, (err, res, body) => {
    if (err) {
      console.error(err);
    } else {
      const info = JSON.parse(body)
      placeID = info.response.venues[0].id;
      console.log('PlaceID', placeID);
       // get photo ------------------------------------------
    
      request({
        url: `https://api.foursquare.com/v2/venues/${placeID}`,
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
          response.render('apitest/apitest', {imgUrl})
        }
      });
    }
  })
   
})
  

// get place ID ------------------------------------------



router.get("/apitest", (req, res, next) => {
  res.render("apitest/apitest");
  });

module.exports = router;