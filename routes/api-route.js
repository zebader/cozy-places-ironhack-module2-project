const express = require("express");
const router = express.Router();
const axios = require('axios');
const Place = require('./../models/place')
const User = require('./../models/user')




router.post('/apitest/:id/delete'), (req, res, next) => {
    const { id } = req.params;
    console.log('id_fjalsjfñhfñkasdhf',id);
    console.log('id params-añsdgfkahgkafdh',req.params);
     Place.findByIdAndRemove(id)
    .then(res =>{
      User.updateOne({_id: req.user.id}, {$pull:{favoPlace:{_id: id}}})
    })
    .then(data => res.redirect('/private'))
    .catch(err => console.log(err));
  };

 
router.post('/apitest/new',(req,res,next) => {
  const { name,address,city,imgUrl} = req.body;
  const location = address
  const img = imgUrl
  const newPlace = new Place({ name, location, city, img }); //instantiate the object
  
  newPlace
    .save() // save it into db, this format is a thenable.
    .then(place =>{
      User.updateOne({_id: req.user._id}, {$push:{favoPlace: newPlace}})
      .then(() =>res.redirect('/private'))
  
  })
    .catch(err => console.log(err));
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
    console.log(response.data.response)
    const venuesIDarray = response.data.response.venues;
    console.log("venues: ", venuesIDarray);
    venuesIDarray.forEach((elem) => {
      elem.imgUrl = 'https://yt3.ggpht.com/a-/AAuE7mB5EQSMiXUOHnc4PZppYQQ0quToZJE7mKIocQ=s900-mo-c-c0xffffffff-rj-k-no';
    })
    res.render('apitest/placesList', {venuesIDarray})
  })
  .catch((error) => {
    next(error)
  })
})
  
router.get("/apitest", (req, res, next) => {
  res.render("apitest/apitest");
  });

module.exports = router;










// return Promise.all(venuesIDarray.map(async (elem, index) =>{
//   return await axios.get(`https://api.foursquare.com/v2/venues/${elem.id}`,{
//     params: {
//       client_id: config.client_id,
//       client_secret: config.client_secret,
//       near: '',
//       name: '',
//       v: '20180323',
//       limit: 1
//     }
//   }).then(() => {
//     venuesIDarray[index].imgUrl = 'https://yt3.ggpht.com/a-/AAuE7mB5EQSMiXUOHnc4PZppYQQ0quToZJE7mKIocQ=s900-mo-c-c0xffffffff-rj-k-no';
//   })
  /*  (err, res, body) => {
    
    if (err) {
      console.error(err);
    } else { */
      /* const info = JSON.parse(body)
      console.log(info)
      const prefixUrl = info.response.venue.photos.groups[1].items[0].prefix;
      const suffixUrl = info.response.venue.photos.groups[1].items[0].suffix;
      const widthUrl = info.response.venue.photos.groups[1].items[0].width;
      const heightUrl = info.response.venue.photos.groups[1].items[0].height;
  
      const imgUrl = `${prefixUrl}${widthUrl}x${heightUrl}${suffixUrl}`;
      
      elem.imgUrl = imgUrl */