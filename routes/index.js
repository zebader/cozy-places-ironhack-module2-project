var express = require('express');
var router = express.Router();
var authRouter = require('./auth-routes');
const APIRouter = require('./api-route.js');
const userRouter = require('./user.js');
// *  '/'
router.use('/', authRouter);
router.use('/', APIRouter);
router.use('/', userRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Cozy Places' });
});

module.exports = router;