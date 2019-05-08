// bin/seed.js
const mongoose = require('mongoose');
const Relation = require('../models/relation');
const config = require('./../config/config');

mongoose.connect(`mongodb://localhost/${config.DB_NAME}`);

relations.collection.drop();

const relations = [
  {
    PlaceAId: '55c2745f498ecf54b4ef887c',
    PlaceBId: '577d0b45498e5bb6af60498c',
    users:['5cd1ba3f00dbce3a65cb688e']
  },
  {
    PlaceAId: '4ba55564f964a520e1fb38e3',
    PlaceBId: '577d0b45498e5bb6af60498c',
    users:['5cd1ba3f00dbce3a65cb688e', '5cd304abd45874676d6c3e53']
  },
  {
    PlaceAId: '50bdbd58e4b0b38c6924c0cb',
    PlaceBId: '4e92aed02c5b7223b9979744',
    users:['5cd1ba3f00dbce3a65cb688e','5cd304778ed52666d9bee2ce']
  },
  {
    PlaceAId: '50bdbd58e4b0b38c6924c0cb',
    PlaceBId: '522989e7498e94135f658c5c',
    users:['5cd1ba3f00dbce3a65cb688e', '5cd304778ed52666d9bee2ce']
  }
  

]

Relation.create(relations, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${relations.length} relations`)
  mongoose.connection.close();
});