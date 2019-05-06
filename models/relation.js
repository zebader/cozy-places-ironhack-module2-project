const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const relationSchema = new Schema({
  placeAId: String,
  placeBId: String,
  users : []
});

const Relation = mongoose.model("Relation", relationSchema);

module.exports = Relation;