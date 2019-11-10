var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Models = require('../models/sequelize');
var { UserModel } = require('../models/sequelize');
var Sequelize = require('sequelize');

passport.use(new LocalStrategy({
  usernameField: 'userName'   
},
function(username, password, done){
        
  username = username.toUpperCase();
  UserModel.findOne({where: { userName: username }})
    .then(user => {
                // console.log('\n\n\n\n ======== in passport======== ');
                // Return if user not found
      if(!user){
        return done(null, false, {
          message: 'unAuthorized'
        });
      }

                // Return if password is wrong
      if(!UserModel.validatePassword(user, password)){
        return done(null, false, {
          message: 'unAuthorized'
        });
      }

      return done(null, user);
    })
    .catch(err => {
      console.log('From config/passport.js. An error occured: ' + err);
      done(err);
    })
  ;
}
));