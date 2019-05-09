const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const relationSchema = new Schema({
  placeAId: String,
  cityA: String,
  placeBId: String,
  cityB: String,
  users : []
});

const Relation = mongoose.model("Relation", relationSchema);

module.exports = Relation;