var express = require('express');
var router = express.Router();
const config = require('../public/config/microapp.config.json');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { path: 'Gaurav',type:'page', userInfo: req.userContext.userinfo, config: JSON.stringify(config) });
});
router.get('/payment', function (req, res, next) {
  res.render('index', { path: 'payment-app',type:'microapp', userInfo: req.userContext.userinfo,config: JSON.stringify(config) });
});
router.get('/upgrade', function (req, res, next) {
  res.render('index', { path: 'react-app',type:'microapp',userInfo: req.userContext.userinfo, config: JSON.stringify(config) });
});
router.get('/iframe', function (req, res, next) {
  res.render('index', { path: 'coverage-map',type:'iframe',userInfo: req.userContext.userinfo, config: JSON.stringify(config) });
});

module.exports = router;
