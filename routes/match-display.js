const express = require('express')
const router = express.Router()
const Place = require('../models/place')
const User = require('../models/user')
const Relation = require('../models/relation')
const { isNotLoggedIn } = require('../middlewares/authMiddelwares')

// helper
function firstLetter (s) {
  return s.replace(/^.{1}/g, s[0].toUpperCase())
}

router.get('/search-by-city', isNotLoggedIn, async (req, res, next) => {
  let { location } = req.query
  location = firstLetter(location)
  try {
    const allMatches = await Relation.find({ $or: [{ cityA: location }, { cityB: location }] })

    if (allMatches.length === 0) {
      const user = await User.findById(req.session.currentUser._id).populate('favoPlace')
      res.render('places/search-place', { errorMessage: "Coudn't find any match!", user })
      return
    }

    const idsArray = []

    await Promise.all(allMatches.map(async (relation) => {
      const { placeAId, placeBId } = relation
      const userData = await User.findById(req.session.currentUser._id).populate('favoPlace')
      const match = userData.favoPlace.filter((userFav) => {
        return (userFav.API_id === placeAId || userFav.API_id === placeBId)
      })

      if (match[0]) { idsArray.push(match[0].API_id) }
      return idsArray
    }))
    if (idsArray.length === 0) {
      const user = await User.findById(req.session.currentUser._id).populate('favoPlace')
      res.render('places/search-place', { errorMessage: "Coudn't find any match with your favorites!", user })
    } else {
      const result = []
      await Promise.all(
        idsArray.map(async (matchId) => {
          const getMatches = await Relation.find({ $or: [{ placeAId: matchId }, { placeBId: matchId }] })
          result.push(...getMatches)
        })
      )
      const user = await User.findById(req.session.currentUser._id).populate('favoPlace')
      res.render('places/search-place', { result, user: user })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).populate('favoPlace')
    res.render('places/search-place', { user })
  } catch (err) { next(err) }
})

module.exports = router
