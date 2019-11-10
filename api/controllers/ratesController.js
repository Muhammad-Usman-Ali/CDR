const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { RateModel } = require('../models/sequelize');
const { SellerModel } = require('../models/sequelize');
const genericHelpers = require('../helpers/genericHelpers');

module.exports.getRatesAll = async (req, res) => {
  let arrayOfRates, startDate, endDate, prefix, routeType;

  if (!req.query) {
    genericHelpers.jsonResult(res, 501, {'message' : 'params required!'});
    return;
  }

  startDate = req.query.startDate;
  endDate = req.query.endDate;
  prefix = req.query.prefix;
  routeType = req.query.routeType;

  // arrayOfRates = await RateModel.findAll()
  //   where: Sequelize.and({
  //     prefix: prefix,
  //     Sequelize.and(
  //       { date: { gte: startDate} },
  //       { date: { lte: endDate} },
  //       )

  //   }
  // });
  try {
    arrayOfRates = await RateModel.findAll({
      attributes: ['id', 'price', 'date', 'minutes', 'prefix', 'sellerName'],
      where: {
        prefix: prefix,
        date: { [Op.gte]: startDate, [Op.lte]: endDate},
        routeType: routeType
      },
      raw: true
      // include: {
      //   model: SellerModel,
      //   attributes: [] // no attributes here, we have targeted the seller.name in the upper level attributes
      // }
    });
  } catch (_error) {
    genericHelpers.jsonResult(res, 501, _error);
    return;
  }

  genericHelpers.jsonResult(res, 200, arrayOfRates);

  console.log();
  
};
