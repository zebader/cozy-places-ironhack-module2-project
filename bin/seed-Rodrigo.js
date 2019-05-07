// bin/seed.js

const mongoose = require('mongoose');
const Place = require('../models/place');

const dbName = 'cozy-places';
mongoose.connect(`mongodb://localhost/${dbName}`);

const place = [
  {
    API_id: "1",
    location: "Location 1",
    name: "Place 1",
    img: "https://www.imgworlds.com/wp-content/uploads/2015/12/ad-ib-dr-gourmet.jpg"
  },
  {
    API_id: "2",
    location: "Location 2",
    name: "Place 2",
    img: "https://www.imgworlds.com/wp-content/uploads/2015/12/ad-ib-dr-gourmet.jpg"
  },
  {
    API_id: "3",
    location: "Location 3",
    name: "Place 3",
    img: "https://www.imgworlds.com/wp-content/uploads/2015/12/ad-ib-dr-gourmet.jpg"
  },
  {
    API_id: "4",
    location: "Location 4",
    name: "Place 4",
    img: "https://www.imgworlds.com/wp-content/uploads/2015/12/ad-ib-dr-gourmet.jpg"
  },
  {
    API_id: "5",
    location: "Location 5",
    name: "Place 5",
    img: "https://www.imgworlds.com/wp-content/uploads/2015/12/ad-ib-dr-gourmet.jpg"
  }

]

Place.create(place, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${place.length} place`)
  mongoose.connection.close();
});