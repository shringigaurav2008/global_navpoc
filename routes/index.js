var express = require('express');
var router = express.Router();
const config = require('../public/config/microapp.config.json');

/* GET home page. */
router.get('/', function (req, res, next) {

  console.log(req.userContext);
  console.log(req.isAuthenticated());
  res.render('index', { appname: 'Upgrade App', userInfo: req.userContext.userinfo,config: JSON.stringify(config) });
});
router.get('/payment', function (req, res, next) {

  res.render('payment', { appname: 'Payment App', userInfo: req.userContext.userinfo,config: JSON.stringify(config) });
});
router.get('/upgrade', function (req, res, next) {
  res.render('upgrade', { appname: 'Upgrade App',userInfo: req.userContext.userinfo, config: JSON.stringify(config) });
});
router.get('/iframe', function (req, res, next) {
  res.render('iframe', { appname: 'Upgrade App',userInfo: req.userContext.userinfo, config: JSON.stringify(config) });
});

module.exports = router;
