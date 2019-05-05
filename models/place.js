const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  place: String,
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;