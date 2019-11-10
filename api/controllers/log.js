var genericHelpers = require('../helpers/genericHelpers');
const { LogModel } = require('../models/sequelize');
var sequelize = require('sequelize');

module.exports.getLogs = function(req, res) {

  if(!req.query.limit || !req.query.skip) {
    genericHelpers.jsonResult(res, 401, {
      'message': 'Limit and skip required'
    }
    );
  } else {
    LogModel
      .findAll({
        limit: req.query.limit,
        offset: req.query.skip,
        order: [
                    // [ sequelize.cast(sequelize.col('lastRecordId'), 'BIGINT') , 'DESC' ]
          ['createdAt', 'DESC']
        ],
                // attributes: ['lastRecordId']
      })
      .then((logs) => {
        genericHelpers.jsonResult(res, 200, logs);
      })
      .catch((err) => {
        console.log('Error: ', err);
        genericHelpers.jsonResult(res, 501, err);
      })
    ;
  }
};

module.exports.truncateLogs = function (req, res) {
  LogModel.destroy({where: {id: {
    gt: 1
  }}})
    .then(() => genericHelpers.jsonResult(res, 200, {'Message': 'All logs are deleted'}))
    .catch((err) => genericHelpers.jsonResult(res, 501, {'Message': 'Internal server error. Detail is as follows: ' + err}));
}