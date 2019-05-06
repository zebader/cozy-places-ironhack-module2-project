const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  API_id: String,
  location: String,
  name: String,
  img: String
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;