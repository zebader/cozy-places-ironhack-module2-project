const express = require("express");
const router = express.Router();
const axios = require('axios');
const Place = require('./../models/place')
const User = require('./../models/user')



router.post('/apitest/delete/:id', (req, res, next) => {
    const { id } = req.params;
    // console.log ('user', favoPlace[0]);
    const { favoPlace } =  req.user;
    console.log('This is the id: ',id);
    console.log('fav ', req.user.id);

     User.findOneAndUpdate({_id: req.user.id}, {$pull:{"favoPlace":{id: id}}},{ 'new': true })
    // User.findByIdAndDelete()
    .then(response =>{
      console.log('respons: ',response)
     
      // res.json({}).status(200)
      res.redirect('/private');
    })
    .catch(err => console.log(err));
// User.find(req.user.id)
  }) ;

 
router.post('/apitest/new',(req,res,next) => {
  const { id,name,address,city,imgUrl} = req.body;
  const location = address
  const img = imgUrl
  const newPlace = new Place({ API_id:id, name, location, city, img });
  newPlace
    .save() // save it into db, this format is a thenable.
    .then( place =>{
  
      User.updateOne({_id: req.user._id}, {$push:{favoPlace: newPlace}})
      .then(() =>res.redirect('/private'))
  
  })
    .catch(next);
});


router.get("/apitest/search", (req, res, next) => {
  const { location, placeName } = req.query;
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
    
    const venuesIDarray = response.data.response.venues;
    venuesIDarray.forEach((elem) => {
      elem.imgUrl = './../images/barista.jpg';
    })
    res.render('apitest/placesList', {venuesIDarray})


/*     
    const venuesIDarray = response.data.response.venues;

      venuesIDarray.forEach((elem) => {

    axios.get(`https://api.foursquare.com/v2/venues/${venuesIDarray.id}`,{
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        v: '20180323'
      }
    }).then( (response) => {

      const photo = {
        prefix: response.data.response.venue.photos.groups[1].items[0].prefix,
        width: response.data.response.venue.photos.groups[1].items[0].width,
        height: response.data.response.venue.photos.groups[1].items[0].height,
        suffix: response.data.response.venue.photos.groups[1].items[0].suffix
      }
      const urlPhoto = `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`

      elem.imgUrl = urlPhoto;

    })

    res.render('apitest/placesList', {venuesIDarray})
    
    })
    .catch((error) => {
      next(error)
    }) */


  })
  .catch((error) => {
    next(error)
  })
})
  
router.get("/apitest", (req, res, next) => {
  res.render("apitest/apitest");
  });

module.exports = router;
