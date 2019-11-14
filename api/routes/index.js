var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.NODE_ENV === 'production' ? process.env.PROD_MY_SECRET :'MY_SECRET'
  // secret: 'MY_SECRET'
});

var ctrlUser = require('../controllers/usersController');
var ctrlAuthentication = require('../controllers/authentication');
var ctrlLogs = require('../controllers/log');
var ctrlGeneric = require('../controllers/genericController');
var ctrlPrefixes = require('../controllers/prefixesController');
var ctrlRates = require('../controllers/ratesController');

var genericHelpers = require('../helpers/genericHelpers');
//helpers
// var isAdmin = require('../helpers/authHelpers').isAdmin;

// authentication routes
router.post('/login', ctrlAuthentication.login);
router.post('/register', ctrlAuthentication.register);
router.get('/profile', auth, ctrlAuthentication.profileRead);

// user routes
router.get('/user/list', auth, ctrlUser.userList);
router.post('/user/create', auth, ctrlUser.create);
router.post('/user/:id/edit', auth, ctrlUser.edit);
router.post('/user/:id/delete', auth, ctrlUser.delete);

// logs routes
router.get('/getLogs', auth, ctrlLogs.getLogs);
// router.get('/truncateLogs', ctrlLogs.truncateLogs);

// genericgenerateQuery
router.get('/get-server-time', auth, ctrlGeneric.getServerTime);
router.get('/getDatabaseSize', ctrlGeneric.getDatabaseSize);
router.get('/generateQuery', ctrlGeneric.generateQuery);

router.get('/rates-by-tariff/:iTariff', genericHelpers.checkingUrl);
router.get('/rates-by-country/:countryName', genericHelpers.checkRatesAll);



router.get('/prefixes/get-prefixes-for-search', auth, ctrlPrefixes.getPrefixesForSearch);
router.get('/rates/get-all', auth, ctrlRates.getRatesAll);
// test
// router.get('/getUsersData', ctrlGeneric.testingUsersData);

module.exports = router;