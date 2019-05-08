const express = require("express");
const router = express.Router();
const axios = require('axios');
const Place = require('./../models/place')
const User = require('./../models/user')

router.get('/matchtest/new',(req,res,next) => {
  const { name,address,city,imgUrl} = req.query;
  const location = address
  const img = imgUrl
  const venuesIDarrayA = { name,location,city,img};
  const finalVenues = {
    venuesIDarrayA
  }
    res.render('apitest/matchtest', {finalVenues})
});

router.get('/matchtest/newB',(req,res,next) => {
  const { name,address,city,imgUrl, venuesIDarrayCity,venuesIDarrayAddress,venuesIDarrayName,venuesIDarrayImg} = req.query;
  const venuesIDarrayB = { name,location: address,city,img: imgUrl};

  const venuesIDarrayA =  {
    city: venuesIDarrayCity,
    location: venuesIDarrayAddress,
    name: venuesIDarrayName,
    img: venuesIDarrayImg
  };
  const finalVenues = {
    venuesIDarrayB,
    venuesIDarrayA
  }

    res.render('apitest/matchtest', {finalVenues})
});

router.get('/matchtest/search',(req,res,next) => {
  const { location, placeName, venuesIDarrayCityB,venuesIDarrayAddressB,venuesIDarrayNameB,venuesIDarrayImgB } = req.query;
  return axios.get('https://api.foursquare.com/v2/venues/search',{
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      near: location,
      query: placeName,
      v: '20180323',
      limit: 5
    }
  }).then( (response) => {

    const venuesIDarrayA = response.data.response.venues;

    venuesIDarrayA.forEach((elem) => {
      elem.imgUrl = 'https://yt3.ggpht.com/a-/AAuE7mB5EQSMiXUOHnc4PZppYQQ0quToZJE7mKIocQ=s900-mo-c-c0xffffffff-rj-k-no';
    })

    const venuesIDarrayB =  {
      city: venuesIDarrayCityB,
      location: venuesIDarrayAddressB,
      name: venuesIDarrayNameB,
      img: venuesIDarrayImgB
    };
    const finalVenues = {
      venuesIDarrayA,
      venuesIDarrayB,
      isSearchA: true
    }

    res.render("apitest/matchList", {finalVenues})
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/matchtest/searchB',(req,res,next) => {
  const { location, placeName, venuesIDarrayCity,venuesIDarrayAddress,venuesIDarrayName,venuesIDarrayImg } = req.query;
  return axios.get('https://api.foursquare.com/v2/venues/search',{
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      near: location,
      query: placeName,
      v: '20180323',
      limit: 5
    }
  }).then( (response) => {  
    const venuesIDarrayB = response.data.response.venues;

    venuesIDarrayB.forEach((elem) => {
      elem.imgUrl = 'https://yt3.ggpht.com/a-/AAuE7mB5EQSMiXUOHnc4PZppYQQ0quToZJE7mKIocQ=s900-mo-c-c0xffffffff-rj-k-no';
    })

    const venuesIDarrayA =  {
      city: venuesIDarrayCity,
      location: venuesIDarrayAddress,
      name: venuesIDarrayName,
      img: venuesIDarrayImg
    };
    const finalVenues = {
      venuesIDarrayB,
      venuesIDarrayA,
      isSearchB: true
    }

    res.render("apitest/matchList", {finalVenues})
  })
  .catch((error) => {
    next(error)
  })
});

router.get("/matchtest", (req, res, next) => {
  res.render("apitest/matchtest");
  });

  module.exports = router;