const express = require("express");
const router = express.Router();
const axios = require('axios');
const Relation = require('./../models/relation')

router.post('/matchtest/relations',(req,res,next) => {

const {venuesIDarrayCity_RA,venuesIDarrayId_RA,venuesIDarrayCity_RB,venuesIDarrayId_RB} = req.body

const placeAId = venuesIDarrayId_RA;
const cityA = venuesIDarrayCity_RA;
const placeBId = venuesIDarrayId_RB;
const cityB = venuesIDarrayCity_RB;
const users = req.user._id;

// Relation.find({
//   $or: [
//     { 'placeAId': placeAId },
//     { 'placeBId': placeBId }
//   ]
// }, function(err, docs) {
//    if(!err) res.send(docs);
// })
// .then(users => { /*logic here*/ })
//     .catch(error => { /*error logic here*/ })

const newRelation = new Relation({ placeAId,cityA, placeBId,cityB, users });

newRelation.save()
.then( (relation) => res.redirect('/private'))
.catch( (err) => console.log(err));
});

router.get('/matchtest/new',(req,res,next) => {

  const { id,name,address,city,imgUrl} = req.query;
  const location = address
  const img = imgUrl
  const venuesIDarrayA = { id,name,location,city,img};
  const finalVenues = {
    venuesIDarrayA
  }
  console.log(venuesIDarrayA)
    res.render('apitest/matchtest', {finalVenues})
});

router.get('/matchtest/newB',(req,res,next) => {
  const { id,name,address,city,imgUrl,venuesIDarrayId, venuesIDarrayCity,venuesIDarrayAddress,venuesIDarrayName,venuesIDarrayImg} = req.query;
  const venuesIDarrayB = { id,name,location: address,city,img: imgUrl};

  const venuesIDarrayA =  {
    id:venuesIDarrayId,
    city: venuesIDarrayCity,
    location: venuesIDarrayAddress,
    name: venuesIDarrayName,
    img: venuesIDarrayImg
  };
  const finalVenues = {
    venuesIDarrayB,
    venuesIDarrayA
  }
  console.log(finalVenues)
    res.render('apitest/matchtest', {finalVenues})
});

router.get('/matchtest/search',(req,res,next) => {
  const { location, placeName, venuesIDarrayId,venuesIDarrayCity,venuesIDarrayAddress,venuesIDarrayName,venuesIDarrayImg } = req.query;
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
      id:venuesIDarrayId,
      city: venuesIDarrayCity,
      location: venuesIDarrayAddress,
      name: venuesIDarrayName,
      img: venuesIDarrayImg
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
  const { location, placeName, venuesIDarrayId,venuesIDarrayCity,venuesIDarrayAddress,venuesIDarrayName,venuesIDarrayImg } = req.query;
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
      id:venuesIDarrayId,
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