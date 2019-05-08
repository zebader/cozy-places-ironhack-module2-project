const express = require('express');
const router = express.Router();
const authRouter = require('./auth-routes');
const APIRouter = require('./api-route');
const placeRouter = require('./place-profile');
const userRouter = require('./user.js');
const matchRouter = require('./match-route.js');

// *  '/'
router.use('/', authRouter);
router.use('/', APIRouter);
router.use('/', userRouter);
router.use('/', placeRouter);
router.use('/', matchRouter);


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Cozy Places' });
});

module.exports = router;