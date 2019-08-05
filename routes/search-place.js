const express = require('express')
const router = express.Router()
const axios = require('axios')
const Place = require('./../models/place')
const User = require('./../models/user')
const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddelwares')

router.post('/delete/:id', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params
  const { favoPlace } = req.user
  try {
    await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { favoPlace: { id: id } } }, { new: true })
    res.redirect('/private')
  } catch (error) {
    next(error)
  }
})

router.post('/new', isNotLoggedIn, isFormFilled, async (req, res, next) => {
  const { id, name, address, city, imgUrl } = req.body
  const location = address
  const img = imgUrl
  try {
    const newPlace = await new Place({ API_id: id, name, location, city, img })
    await newPlace.save()
    await User.updateOne({ _id: req.user._id }, { $push: { favoPlace: newPlace } })
    res.redirect('/private')
  } catch (error) {
    next(error)
  }
})

router.get('/search', isNotLoggedIn, async (req, res, next) => {
  const { location, placeName } = req.query
  try {
    const venues = await axios.get('https://api.foursquare.com/v2/venues/search', {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        near: location,
        query: placeName,
        v: '20180323',
        limit: 5
      }
    })

    const venuesIDarray = venues.data.response.venues
    await Promise.all(
      venuesIDarray.map(async (elem) => {
        const result = await axios.get(`https://api.foursquare.com/v2/venues/${elem.id}`, {
          params: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            v: '20180323'
          } })
        let urlPhoto = null

        if (result.data.response.venue.photos.count !== 0) {
          const photo = {
            prefix: result.data.response.venue.photos.groups[1].items[0].prefix,
            width: result.data.response.venue.photos.groups[1].items[0].width,
            height: result.data.response.venue.photos.groups[1].items[0].height,
            suffix: result.data.response.venue.photos.groups[1].items[0].suffix
          }
          urlPhoto = `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`
        } else {
          urlPhoto = './../images/barista.jpg'
        }
        elem.imgUrl = urlPhoto
      })
    )
    res.render('places/placesList', { venuesIDarray })
  } catch (error) {
    next(error)
  }
})

router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('places/search')
})

module.exports = router
