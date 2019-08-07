const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Place = require('../models/place')

const userSchema = new Schema({
  username: String,
  password: String,
  favoPlace: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
