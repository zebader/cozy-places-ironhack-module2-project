const express = require('express')
const router = express.Router()
const Place = require('../models/place')
const User = require('../models/user')
const Relation = require('../models/relation')

// helper
function firstLetter (s) {
  return s.replace(/^.{1}/g, s[0].toUpperCase())
}

router.get('/search-by-city', async (req, res, next) => {
  let { location } = req.query
  location = firstLetter(location)
  try {
    const allMatches = await Relation.find({ $or: [{ cityA: location }, { cityB: location }] })

    if (allMatches.length === 0) {
      res.render('places/search-place', { errorMessage: "Coudn't find any match!" })
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
      res.render('places/search-place', { errorMessage: "Coudn't find any match!" })
    } else {
      const result = []
      await Promise.all(
        idsArray.map(async (matchId) => {
          const getMatches = await Relation.find({ $or: [{ placeAId: matchId }, { placeBId: matchId }] })
          result.push(...getMatches)
        })
      )
      res.render('places/search-place', { result })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', (req, res, next) => {
  res.render('places/search-place')
})

module.exports = router
