const express = require('express');
const router = express.Router();
const authRouter = require('./auth-routes');
const placefinderRouter = require('./placefinder');

// *  '/'
router.use('/', authRouter);
router.use('/placefinder', placefinderRouter);


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Cozy Places' });
});

module.exports = router;