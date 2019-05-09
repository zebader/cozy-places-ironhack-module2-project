const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get("/place-profile/:id", (req, res, next) => {

  const API_id = {
    API_id:req.params.id
  }

  axios.get(`https://api.foursquare.com/v2/venues/${API_id.API_id}`,{
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      v: '20180323'
    }
  }).then( (response) => {

    const data = {
      data: response.data.response.venue
    }

    let urlPhoto = null;
    let tip = null;

    if(response.data.response.venue.photos.count !== 0){
      let photo = {
        prefix: response.data.response.venue.photos.groups[1].items[0].prefix,
        width: response.data.response.venue.photos.groups[1].items[0].width,
        height: response.data.response.venue.photos.groups[1].items[0].height,
        suffix: response.data.response.venue.photos.groups[1].items[0].suffix
      }
      urlPhoto = `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`
    }
    else{
      urlPhoto = "./../images/barista.jpg";
    }

    if(response.data.response.venue.tips.count !== 0){
      tip = {
        tip: response.data.response.venue.tips.groups[0].items[0].text
      }
    } else {
      tip = 'No tips'
    }
    const description = {
      description: response.data.response.venue.description
    }

    const dataAndImage = {
      data,
      urlPhoto,
      tip,
      description
    }

    res.render('apitest/place-profile',  dataAndImage )
  })
  .catch((error) => {
    next(error)
  })

  });

module.exports = router;