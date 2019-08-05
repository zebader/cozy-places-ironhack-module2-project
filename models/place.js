const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const placeSchema = new Schema({
  API_id: String,
  location: String,
  city: String,
  name: String,
  img: String,
  tips: String
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place
