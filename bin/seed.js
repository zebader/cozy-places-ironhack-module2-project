// bin/seed.js
const mongoose = require('mongoose');
const Place = require('../models/place');
const config = require('./../config/config');

mongoose.connect(`mongodb://localhost/${config.DB_NAME}`);

Place.collection.drop();

const places = [
  {
    API_id: '54246235498ec95dc8bc9dde',
    location: 'Barcelona',
    city: 'Barcelona',
    name: 'al pot petit',
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/08/84/f6/c2/tuna-sandwich-on-wholemeal.jpg',
    tips:'Rooftop boozy brunch in Lower East Side. Cant drink all day unless you start in the morning!'
  },
  {
    API_id: '5882810014f8f4494f93fa21',
    location: 'Barcelona',
    city: 'Barcelona',
    name: 'Bodega 1886 El Pot Petit',
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/8d/0c/35/perfectopara-hacer-unos.jpg',
    tips:'Rooftop boozy brunch in Lower East Side. Cant drink all day unless you start in the morning!'
  },
  {
    API_id: '4b9164f1f964a520d9b833e3',
    location: 'Barcelona',
    city: 'Barcelona',
    name: 'Petit Comitè',
    img: 'https://petitcomite.cat/wp-content/uploads/2015/10/restaurant-petit-comite.jpg',
    tips:'Rooftop boozy brunch in Lower East Side. Cant drink all day unless you start in the morning!'
  }
]

Place.create(places, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${places.length} places`)
  mongoose.connection.close();
});