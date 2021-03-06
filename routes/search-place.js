const express = require('express')
const router = express.Router()
const axios = require('axios')
const Place = require('../models/place')
const User = require('../models/user')
const { isNotLoggedIn, isSearchQuery } = require('../middlewares/authMiddelwares')

router.post('/new', isNotLoggedIn, async (req, res, next) => {
  try {
    const { id, name, address, city, imgUrl } = req.body

    const { _id } = req.session.currentUser
    const location = address
    const img = imgUrl
    const newPlace = await new Place({ API_id: id, name, location, city, img })
    await newPlace.save()

    await User.findByIdAndUpdate(_id, { $push: { favoPlace: newPlace._id } })
    res.redirect('/profile')
  } catch (error) {
    next(error)
  }
})

router.get('/search', isNotLoggedIn, isSearchQuery, async (req, res, next) => {
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
    const user = await User.findById(req.session.currentUser._id).populate('favoPlace')

    user.favoPlace.forEach((user) => {
      venuesIDarray.forEach((venue) => {
        let isButtonDisabled = null
        if (user.API_id === venue.id) {
          isButtonDisabled = true

          venue.isButton = isButtonDisabled
        } else {
          isButtonDisabled = false
        }
      })
    })
    venuesIDarray.user = user

    res.render('places/places-list', { venuesIDarray })
  } catch (error) {
    next(error)
  }
})
router.post('/delete/:id', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params
  try {
    const place = await Place.findOne({ API_id: id })
    await User.findByIdAndUpdate(req.session.currentUser._id, { $pull: { favoPlace: place._id } }, { new: true })

    res.redirect('/profile')
  } catch (error) {
    next(error)
  }
})
router.get('/:id', isNotLoggedIn, async (req, res, next) => {
  const API_id = req.params.id
  try {
    const place = await axios.get(`https://api.foursquare.com/v2/venues/${API_id}`, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        v: '20180323'
      }
    })
    const data = {
      data: place.data.response.venue
    }

    let urlPhoto = null
    let tip = null

    if (place.data.response.venue.photos.count !== 0) {
      const photo = {
        prefix: place.data.response.venue.photos.groups[1].items[0].prefix,
        width: place.data.response.venue.photos.groups[1].items[0].width,
        height: place.data.response.venue.photos.groups[1].items[0].height,
        suffix: place.data.response.venue.photos.groups[1].items[0].suffix
      }
      urlPhoto = `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`
    } else {
      urlPhoto = './../images/barista.jpg'
    }

    if (place.data.response.venue.tips.count !== 0) {
      tip = {
        tip: place.data.response.venue.tips.groups[0].items[0].text
      }
    } else {
      tip = 'No tips'
    }
    const description = {
      description: place.data.response.venue.description
    }

    const user = await User.findById(req.session.currentUser._id).populate('favoPlace')

    const dataAndImage = {
      user,
      data,
      urlPhoto,
      tip,
      description,
      button: false
    }

    user.favoPlace.forEach((elem) => {
      elem.API_id === API_id ? dataAndImage.button = true : null
    })

    res.render('places/place-profile', dataAndImage)
  } catch (error) {
    next(error)
  }
})

router.get('/', isNotLoggedIn, (req, res, next) => {
  const user = req.session.currentUser
  const data = {
    user,
    messages: req.flash('errorFormNotFilled')
  }

  res.render('places/search', data)
})

module.exports = router
