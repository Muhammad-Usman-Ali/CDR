var passport = require('passport');
var Models = require('../models/sequelize');
var { UserModel } = require('../models/sequelize');
var genericHelpers = require('../helpers/genericHelpers');

// Creates new users
module.exports.register = function(req, res){
  var user = UserModel.build();

  if(!req.body.name || !req.body.userName || !req.body.password) {
    genericHelpers.jsonResult(res, 401, {
      'message': 'Name, User Name and Password required'
    });
    return;
  }
  user.name = req.body.name;
  user.userName = req.body.userName.toUpperCase();

  UserModel.setPassword(user, req.body.password);
  user.save()
    .catch(err => {
      console.log('==========> Error: ' + err);
      genericHelpers.jsonResult(res, 401, {
        'message': err
      });
    })
    .then(() => {
      var token;
      token = UserModel.generateJwt(user);
      genericHelpers.jsonResult(res, 200, { 'token' : token });
    })
  ;

};

// LOGIN
module.exports.login = function(req, res){
  passport.authenticate('local', function(err, user, info) {
    var token;
       
       // If Passport throws/catches an error
    if(err){
      genericHelpers.jsonResult(res, 404, err);

      return;
    }

    if(user){
      token = UserModel.generateJwt(user);
      genericHelpers.jsonResult(res, 200, {'token': token});
    } else {
      genericHelpers.jsonResult(res, 401, info);
    }
  })(req, res);
};

//  Read Profile
module.exports.profileRead = function(req, res){

    // If no user ID exists in the JWT return a 401
  if(!req.user.id){
    genericHelpers.jsonResult(res, 401, {'message': 'UnauthorizedError: private profile'});
  } else {
    UserModel
      .findOne({where: {id : req.user.id}})
      .catch(err => genericHelpers.jsonResult(res, 401, err))
      .then(user => genericHelpers.jsonResult(res, 200, user));
  }
};
