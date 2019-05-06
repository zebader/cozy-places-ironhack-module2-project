var express = require('express');
var router = express.Router();
var authRouter = require('./auth-routes');
const APIRouter = require('./api-route.js');
// *  '/'
router.use('/', authRouter);
router.use('/', APIRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Cozy Places' });
});

module.exports = router;