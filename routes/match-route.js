const express = require('express')
const router = express.Router()
const axios = require('axios')
const Relation = require('./../models/relation')
const User = require('../models/user')

router.post('/relations', (req, res, next) => {
  const { venuesIDarrayCity_RA, venuesIDarrayId_RA, venuesIDarrayCity_RB, venuesIDarrayId_RB } = req.body

  const placeAId = venuesIDarrayId_RA
  const cityA = venuesIDarrayCity_RA
  const placeBId = venuesIDarrayId_RB
  const cityB = venuesIDarrayCity_RB
  const users = req.user._id

  Relation.find({
    $and: [
      { placeAId: placeAId },
      { placeBId: placeBId }
    ]
  })
    .then(placeRelation => {
      if (placeRelation.length === 0) {
        const newRelation = new Relation({ placeAId, cityA, placeBId, cityB, users })
        newRelation.save()
          .then((relation) => res.redirect('/private'))
          .catch((err) => console.log(err))
      } else {
        Relation.findByIdAndUpdate(placeRelation[0]._id, {
          $push: { users: req.user._id }
        }, { new: true })
          .then((relation) => res.redirect('/private'))
          .catch((err) => console.log(err))
      }
    })
    .catch(error => { console.log(error) })
})

router.get('/new', (req, res, next) => {
  const { id, name, address, city, imgUrl } = req.query
  const location = address
  const img = imgUrl
  const venuesIDarrayA = { id, name, location, city, img }
  const finalVenues = {
    venuesIDarrayA
  }

  res.render('places/match', { finalVenues })
})

router.get('/newB', (req, res, next) => {
  const { id, name, address, city, imgUrl, venuesIDarrayId, venuesIDarrayCity, venuesIDarrayAddress, venuesIDarrayName, venuesIDarrayImg } = req.query
  const venuesIDarrayB = { id, name, location: address, city, img: imgUrl }

  const venuesIDarrayA = {
    id: venuesIDarrayId,
    city: venuesIDarrayCity,
    location: venuesIDarrayAddress,
    name: venuesIDarrayName,
    img: venuesIDarrayImg
  }
  const finalVenues = {
    venuesIDarrayB,
    venuesIDarrayA
  }

  res.render('places/match', { finalVenues })
})

router.get('/search', async (req, res, next) => {
  const { location, placeName, venuesIDarrayId, venuesIDarrayCity, venuesIDarrayAddress, venuesIDarrayName, venuesIDarrayImg } = req.query
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
    const venuesIDarrayB = {
      id: venuesIDarrayId,
      city: venuesIDarrayCity,
      location: venuesIDarrayAddress,
      name: venuesIDarrayName,
      img: venuesIDarrayImg
    }
    const user = await User.findById(req.session.currentUser._id).populate('favoPlace')

    const finalVenues = {
      venuesIDarrayA,
      venuesIDarrayB,
      user: user,
      isSearchA: true
    }

    res.render('places/match-list', { finalVenues })
  } catch (error) {
    next(error)
  }
})

router.get('/searchB', async (req, res, next) => {
  const { location, placeName, venuesIDarrayId, venuesIDarrayCity, venuesIDarrayAddress, venuesIDarrayName, venuesIDarrayImg } = req.query
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
    const venuesIDarrayB = venues.data.response.venues

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

    const venuesIDarrayA = {
      id: venuesIDarrayId,
      city: venuesIDarrayCity,
      location: venuesIDarrayAddress,
      name: venuesIDarrayName,
      img: venuesIDarrayImg
    }
    const user = await User.findById(req.session.currentUser._id).populate('favoPlace')
    const finalVenues = {
      venuesIDarrayB,
      venuesIDarrayA,
      user: user,
      isSearchB: true
    }

    res.render('places/match-list', { finalVenues })
  } catch (error) { next(error) }
})

router.get('/', (req, res, next) => {
  res.render('places/match')
})

module.exports = router
