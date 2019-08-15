const express = require('express')
const router = express.Router()
const axios = require('axios')
const Relation = require('./../models/relation')
const User = require('../models/user')
const { isLoggedIn, isNotLoggedIn, isFormFilled, isSearchQuery } = require('../middlewares/authMiddelwares')

router.post('/relations', isNotLoggedIn, async (req, res, next) => {
  const { city_RA, id_RA, name_RA, location_RA, imgUrl_RA, city_RB, id_RB, name_RB, location_RB, imgUrl_RB } = req.body
  const result = {
    placeAId: id_RA,
    nameA: name_RA,
    imgAUrl: imgUrl_RA,
    locationA: location_RA,
    cityA: city_RA,
    placeBId: id_RB,
    nameB: name_RB,
    imgBUrl: imgUrl_RB,
    locationB: location_RB,
    cityB: city_RB }

  const users = req.session.currentUser._id

  try {
    const placeRelation = await Relation.find({ $and: [{ placeAId: result.placeAId }, { placeBId: result.placeBId }] })

    if (placeRelation.length === 0) {
      const newRelation = await new Relation(result)
      await newRelation.save()
      res.redirect('/profile')
    } else {
      await Relation.findByIdAndUpdate(placeRelation[0]._id, {
        $push: { users }
      }, { new: true })
      res.redirect('/profile')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/new', isNotLoggedIn, (req, res, next) => {
  const { id, name, location, city, imgUrl, id_B, name_B, location_B, city_B, imgUrl_B } = req.query

  const venuesIDarrayA = { id, name, location, city, imgUrl }
  const venuesIDarrayB = { id_B, name_B, location_B, city_B, imgUrl_B }

  let finalVenues = {}
  if (venuesIDarrayB.id_B === '') {
    finalVenues = {
      venuesIDarrayA
    }
  } else {
    finalVenues = {
      venuesIDarrayA,
      venuesIDarrayB
    }
  }

  res.render('places/match', { finalVenues })
})

router.get('/newB', isNotLoggedIn, (req, res, next) => {
  const { id_B, name_B, location_B, city_B, imgUrl_B, id, name, location, city, imgUrl } = req.query
  const venuesIDarrayA = { id, name, location, city, imgUrl }
  const venuesIDarrayB = { id_B, name_B, location_B, city_B, imgUrl_B }

  let finalVenues = {}
  if (venuesIDarrayA.id === '') {
    finalVenues = {
      venuesIDarrayB
    }
  } else {
    finalVenues = {
      venuesIDarrayA,
      venuesIDarrayB
    }
  }
  res.render('places/match', { finalVenues })
})

router.get('/search', isNotLoggedIn, async (req, res, next) => {
  const { location, placeName, id_B, name_B, location_B, city_B, imgUrl_B } = req.query
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

    const venuesIDarrayA = venues.data.response.venues
    const venuesIDarrayB = { id_B, name_B, location_B, city_B, imgUrl_B }

    await Promise.all(venuesIDarrayA.map(async (elem) => {
      const result = await axios.get(`https://api.foursquare.com/v2/venues/${elem.id}`, {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          v: '20180323'
        }
      })

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
    }))

    const user = await User.findById(req.session.currentUser._id).populate('favoPlace')

    let finalVenues = {}
    if (venuesIDarrayB.id_B === '') {
      finalVenues = {
        venuesIDarrayA,
        user: user,
        isSearchA: true
      }
    } else {
      finalVenues = {
        venuesIDarrayA,
        venuesIDarrayB,
        user: user,
        isSearchA: true
      }
    }

    res.render('places/match-list', { finalVenues })
  } catch (error) {
    next(error)
  }
})

router.get('/searchB', isNotLoggedIn, async (req, res, next) => {
  const { location_B, placeName_B, id, name, location, city, imgUrl } = req.query

  try {
    const venues = await axios.get('https://api.foursquare.com/v2/venues/search', {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        near: location_B,
        query: placeName_B,
        v: '20180323',
        limit: 5
      }
    })
    const venuesIDarrayB = venues.data.response.venues
    const venuesIDarrayA = { id, name, location, city, imgUrl }

    await Promise.all(venuesIDarrayB.map(async (elem) => {
      const result = await axios.get(`https://api.foursquare.com/v2/venues/${elem.id}`, {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          v: '20180323'
        }
      })
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
    }))

    const user = await User.findById(req.session.currentUser._id).populate('favoPlace')

    let finalVenues = {}
    if (venuesIDarrayA.id === '') {
      finalVenues = {
        venuesIDarrayB,
        user: user,
        isSearchB: true
      }
    } else {
      finalVenues = {
        venuesIDarrayA,
        venuesIDarrayB,
        user: user,
        isSearchB: true
      }
    }

    res.render('places/match-list', { finalVenues })
  } catch (error) { next(error) }
})

router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('places/match')
})

module.exports = router
