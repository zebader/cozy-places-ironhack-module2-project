const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../models/user')

const relationSchema = new Schema({
  placeAId: String,
  cityA: String,
  placeBId: String,
  cityB: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const Relation = mongoose.model('Relation', relationSchema)

module.exports = Relation
