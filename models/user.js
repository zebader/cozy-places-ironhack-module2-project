const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  favoPlace: [
    {
      API_id: { type: String },
      location: String,
      city: String,
      name: String,
      img: String,
      tips : String
    }
  ]
}, {
  timestamps: { 
    createdAt: "created_at",
    updatedAt: "updated_at" 
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;