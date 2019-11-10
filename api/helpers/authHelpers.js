var genericHelpers = require('../helpers/genericHelpers');

module.exports.isAdmin = function (req, res, next) {
    // console.log(req.user, '\n\n\n\n\n No admin here idiot ===================================== \n\n\n\n\n\n');

    // when isAdmin not found
  if (!req || !req.user || req.user.isAdmin == null) {
        // console.log('\n\n\n\n\ from isAdmin. user.isAdmin not found \n\n\n\n');
    genericHelpers.jsonResult(res, 503, {'message': 'isAdmin Required'});
    return;
  } 
    
  if (req.user.isAdmin) {
    next();
  } else {
    genericHelpers.jsonResult(res, 503, {'message':'notAccess'});
  }
};
