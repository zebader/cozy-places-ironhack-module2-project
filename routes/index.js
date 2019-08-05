const express = require('express');
const router = express.Router();
const authRouter = require('./auth-routes');
const searchPlaceRouter = require('./search-place');
const placeRouter = require('./place-profile');
const userRouter = require('./user.js');
const matchRouter = require('./match-route.js');
const matchDisplayRouter = require('./matchDisplay.js');

// *  '/'
router.use('/', authRouter);
router.use('/places', searchPlaceRouter);
router.use('/', userRouter);
router.use('/', placeRouter);
router.use('/', matchRouter);
router.use('/', matchDisplayRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Cozy Places' });
});

module.exports = router;