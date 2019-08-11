const express = require('express')
const router = express.Router()
const axios = require('axios')
const Place = require('./../models/place')
const User = require('./../models/user')
const Relation = require('./../models/relation')

// helper
function firstLetter (s) {
  return s.replace(/^.{1}/g, s[0].toUpperCase())
 }

router.get('/apitest/searchByCity', (req, res, next) => {
  let { location } = req.query
  location = firstLetter(location)
  //Find Relations that have location from the search and are in favorite places from the user
  Relation.find({ $or: [
    { cityA: location },
    { cityB: location }
  ]
  })
    .then(allPlacesMatchedCityFromDb => {
      if (allPlacesMatchedCityFromDb.length === 0) {
        res.render('apitest/search-place', { errorMessage: "Coudn¡'t find any match!" })
        return
      }
      const idsArray = []

    allPlacesMatchedCityFromDb.forEach((relation) => {
        if (relation.cityA === location) {
          idsArray.push(relation.placeAId)
      } else {
          idsArray.push(relation.placeBId)
      }
      })
      User.find({ $and: [{ 'favoPlace.API_id': { $in: idsArray } }, { _id: req.user._id }] })
        .then((user) => {
          if (user) {
            console.log(idsArray)
            Place.find({ API_id: { $in: idsArray } })
              .then((placesArray) => {
                console.log(placesArray)
                const data = placesArray
          res.render('apitest/search-place', { data })
              })
          } else {
            res.render('apitest/search-place', { errorMessage: "Coudn¡'t find any match!" })
          }
        })
        .catch(err => console.log(err))
      })
    .catch(err => console.log(err))
})

// Place.find({$or:[
//   {API_id:allPlacesMatchedCityFromDb.placeAId},
//   {API_id:allPlacesMatchedCityFromDb.placeBId}
// ]})

// .then(allPlacesMatchedCityFromDb => {
//     allPlacesMatchedCityFromDb.forEach((e)=>{
//       User.favoPlace.forEach((u) =>{
//         if (e.PlaceAId === u.API_Id){
//           console.log('user: ',u.API_Id,' placeId: ',e.PlaceAId );
//         }
//       })
//       // User.find({favoPlace:e.PlaceAId})
//       // .then(dataA => console.log('data A',dataA))

//       // User.find({favoPlace:{API_id:e.PlaceBId}})

//   })

//   allPlacesMatchedCityFromDb.forEach((e)=>{
//     User.find({favoPlace:e.PlaceAId})
//     .then(dataA => console.log('data A',dataA))

//     // User.find({favoPlace:{API_id:e.PlaceBId}})
//   })
// db.movies.find({ $and: [{year: 2000}, {rate:  "8.5"}]})
//   allPlacesMatchedCityFromDb.forEach((e)=>{
//     console.log('eeee-----------------------',e);

//      User.find({$or:
//          [
//     {'favoPlace.API_id':e.placeAId},
//     {'favoPlace.API_id':e.placeBId}
//   ]
//      }).then( data1 => console.log('dataaaaaaaaaaaaaaaaa', data1))
// })
// User.find({$or:
//   [
//     {favoPlace: {API_id:allPlacesMatchedCityFromDb.placeAId}},
//     {favoPlace: {API_id:allPlacesMatchedCityFromDb.placeBId}}
//   ]
// })

// .catch(err => console.log(err));

// User.find({favoPlace:{location}})
// .then(data => console.log('data',data.))
// .catch(err => console.log(err));

// Celebrity.find({})
// .then(allTheCelebritiesFromDB => {
//   res.render('celebrities', { allTheCelebritiesFromDB });
// })
// .catch(err => console.log(err));

// return axios.get('https://api.foursquare.com/v2/venues/search',{
//   params: {
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET,
//     near: location,
//     v: '20180323',
//     limit: 5
//   }
// }).then( (response) => {
//   console.log('Hola', response.data.response.venues);
//   const places = response.data.response.venues;
//   places.forEach((elem) => {
//     elem.imgUrl = 'https://yt3.ggpht.com/a-/AAuE7mB5EQSMiXUOHnc4PZppYQQ0quToZJE7mKIocQ=s900-mo-c-c0xffffffff-rj-k-no';
//   })
//   // res.render('apitest/placesList', {places})
// })
// .catch((error) => {
// next(error)
// })
// })

router.get('/citySearch', (req, res, next) => {
  console.log('user', User.username)
  
  res.render('apitest/search-place') 
  })


module.exports = router
