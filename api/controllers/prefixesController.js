const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { PrefixModel } = require('../models/sequelize');
const { RateModel } = require('../models/sequelize');
const genericHelpers = require('../helpers/genericHelpers');

module.exports.getPrefixesForSearch = async (req, res) => {
  let arrayOfPrefixes, arrayOfPrefixesToBeSend, options, searchForFixed;
  const searchTerm = req.query ? req.query.searchTerm : req.query;

  searchForFixed = req.query.searchForFixed;

  if (!searchTerm) {
    genericHelpers.jsonResult(res, 501, {'message': 'params required!'});
    return;
  }


  try {
    options = {
      attributes: [
        'prefix',
        [Sequelize.fn('max', Sequelize.col('country')), 'country'],
        [Sequelize.fn('max', Sequelize.col('operatorName')), 'operatorName'],
      ],
      group: ['prefix'],
      where: {
        prefix: {
          [Op.startsWith]: searchTerm
        }
      },
      limit: 50,
      raw: true,
      order: ['prefix']
    };

    // will not search for fixed
    if (searchForFixed == false || searchForFixed == 'false') {
      options.where.operatorName = { [Op.notLike]: 'Fixed%' };
    }

    arrayOfPrefixes = await PrefixModel.findAll(options);
      
  } catch (_error) {
    console.log(_error);
    
    genericHelpers.jsonResult(res, 501, JSON.stringify(_error));
    return;
  }

  
    



  // removes prefixes which are not a number
  arrayOfPrefixesToBeSend = arrayOfPrefixes.filter(_e => !isNaN(parseInt(_e.prefix)) && (_e.prefix.toString().indexOf('.') == -1));
  
  arrayOfPrefixes.forEach(_e => {
    _e.prefix = _e.prefix.toString(); 
  
    let arrayOfOperatorNameParts = _e.operatorName.split(' - ');

    if (arrayOfOperatorNameParts[0] == 'Mobile') {
      _e.operatorName = arrayOfOperatorNameParts[1];
    }
    // prefix = prefix + ')';


  });

  genericHelpers.jsonResult(res, 200, arrayOfPrefixesToBeSend);


};