// bin/seed.js
const mongoose = require('mongoose');
const Relation = require('../models/relation');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI);

Relation.collection.drop();

const relation = [
  {
    placeAId: '55c2745f498ecf54b4ef887c',
    cityA: 'Barcelona',
    placeBId: '577d0b45498e5bb6af60498c',
    cityB: 'Nairobi',
    users:[]
  },
  {
    placeAId: '4ba55564f964a520e1fb38e3',
    cityA: 'Barcelona',
    placeBId: '577d0b45498e5bb6af60498c',
    cityB: 'Nairobi',
    users:[]
  },
  {
    placeAId: '50bdbd58e4b0b38c6924c0cb',
    cityA: 'Zurich',
    placeBId: '4e92aed02c5b7223b9979744',
    cityB: 'Nairobi',
    users:[]
  },
  {
    placeAId: '50bdbd58e4b0b38c6924c0cb',
    cityA: 'Zurich',
    placeBId: '522989e7498e94135f658c5c',
    cityB: 'Nairobi',
    users:[]
  },
  {
  placeAId: '00005',
  cityA: 'Lisbon',
  placeBId: '0001',
  cityB: 'Barcelona',
  users:[]
}
  ]

Relation.create(relation, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${relation.length} relation`)
  mongoose.connection.close();
});



// const relation = [
//   {
//     PlaceAId: '55c2745f498ecf54b4ef887c',
//     cityA: 'Barcelona',
//     PlaceBId: '577d0b45498e5bb6af60498c',
//     cityB: 'Nairobi',
//     users:['5cd1ba3f00dbce3a65cb688e']
//   },
//   {
//     PlaceAId: '4ba55564f964a520e1fb38e3',
//     cityA: 'Barcelona',
//     PlaceBId: '577d0b45498e5bb6af60498c',
//     cityB: 'Nairobi',
//     users:['5cd1ba3f00dbce3a65cb688e', '5cd304abd45874676d6c3e53']
//   },
//   {
//     PlaceAId: '50bdbd58e4b0b38c6924c0cb',
//     cityA: 'Zurich',
//     PlaceBId: '4e92aed02c5b7223b9979744',
//     cityB: 'Nairobi',
//     users:['5cd1ba3f00dbce3a65cb688e','5cd304778ed52666d9bee2ce']
//   },
//   {
//     PlaceAId: '50bdbd58e4b0b38c6924c0cb',
//     cityA: 'Zurich',
//     PlaceBId: '522989e7498e94135f658c5c',
//     cityB: 'Nairobi',
//     users:['5cd1ba3f00dbce3a65cb688e', '5cd304778ed52666d9bee2ce']
//   }
//   ]