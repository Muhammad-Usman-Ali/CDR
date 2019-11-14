
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = (sequelize, type) => {
  var model =  sequelize.define('user', {
    id:       { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    userName: { type:type.STRING, allowNull: false },
    password:   type.STRING,
    name:       type.STRING,
    email:      type.STRING,
    dob:        type.STRING,
    country:    type.STRING,
    isAdmin:  { type: type.BOOLEAN, defaultValue: false },
    hash:       type.STRING,
    salt:       type.STRING
  }, {
    indexes: [
          // Create a unique index on userName
      { unique: true, fields: ['userName'] },
    ]
  });

    // setPassword method for creating hashes from passwords
  model.setPassword = function(user, password){
    user.salt = crypto.randomBytes(16).toString('hex');
    user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
  };

    // validates the user passwords
  model.validatePassword = function(user, password){
    var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    return user.hash === hash;
  };

    // genrates the JWT token
  model.generateJwt = function(user){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
      id: user.id,
      userName: user.userName,
      name: user.name,
      isAdmin: user.isAdmin,
      exp: parseInt(expiry.getTime()/ 1000),
    }, process.env.NODE_ENV === 'production' ? process.env.PROD_MY_SECRET :'MY_SECRET');
    // }, 'MY_SECRET');
  };


    
  return model;
};