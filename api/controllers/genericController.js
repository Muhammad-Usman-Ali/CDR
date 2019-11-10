const { sequelize } = require('../models/sequelize');
var genericHelpers = require('../helpers/genericHelpers');


module.exports.getDatabaseSize = function(req, res) {
  if(!req.query || !req.query.databaseName) {
    genericHelpers.jsonResult(res, 200, 'Message: Database name is required: databaseName');
    return;
  }

  sequelize.query('SELECT pg_size_pretty(pg_database_size("' + req.query.databaseName + '"))', {type: sequelize.QueryTypes.SELECT})
    .then(result => {
            // console.log(result);
      genericHelpers.jsonResult(res, 200, result);
    })
    .catch(err => {
      genericHelpers.jsonResult(res, 501, err);
    })
  ;
};

module.exports.generateQuery = function(req, res) {
  sequelize.query(req.query.query)
    .spread((results, metadata) => {
      genericHelpers.jsonResult(res, 200, {'=====> results': results, '=====> metadata': metadata});
    })
    .catch(err => {
      genericHelpers.jsonResult(res, 500, {Error: err});
    });
};

module.exports.getServerTime = (req, res) => {

  var timeNow;
  if (req.user.isAdmin == true) {
    try {
      timeNow = (new Date()).toUTCString();
      genericHelpers.jsonResult(res, 200, timeNow);
      return;
    } catch (error) {
      genericHelpers.jsonResult(res, 501, error);
      return;
    }
  }

  genericHelpers.jsonResult(res, 401, 'Not allowed');
};
