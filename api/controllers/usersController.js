var genericHelpers = require('../helpers/genericHelpers');
const { UserModel } = require('../models/sequelize');

module.exports.userList = async function (req, res) {

  var userList;
  try {
    userList = await UserModel.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: ['id', 'userName', 'password', 'isAdmin']
    });

    genericHelpers.jsonResult(res, 200, userList);
        
  } catch (error) {
    genericHelpers.jsonResult(res, 503, error);
  }
};

module.exports.create = async function (req, res) {
    
  if (!req || !req.body || !req.body.userName || !req.body.password) {
    genericHelpers.jsonResult(res, 501, {'message': 'Params required!'});
    return;
  }
  try {
    let newUser;
    let user =  UserModel.build(req.body);
    user.isAdmin = user.isAdmin ? user.isAdmin : false;
    user.userName = user.userName.toUpperCase();
    UserModel.setPassword(user, req.body.password);

    await user.save();

    newUser = await UserModel.findOne({
      where : {
        userName: user.userName
      },
      attributes: ['id', 'userName', 'password', 'isAdmin']
    });
    
    genericHelpers.jsonResult(res, 200, newUser);
  } catch (error) {
    console.log(error);
    genericHelpers.jsonResult(res, 503, error);
  }
};

module.exports.edit = async function (req, res) {
    
  if (!req || !req.body || !req.body.userName || !req.body.password) {
    genericHelpers.jsonResult(res, 501, {'message': 'Params required!'});
    return;
  }
  try {
    const user = await UserModel.findOne({ where: { id: req.params.id }});
    user.isAdmin = req.body.isAdmin ? req.body.isAdmin : false;
    user.userName = req.body.userName.toUpperCase();
    user.password = req.body.password;
    UserModel.setPassword(user, req.body.password);

    await user.save();

    genericHelpers.jsonResult(res, 200, user);
  } catch (error) {
    console.log(error);
    genericHelpers.jsonResult(res, 503, error);
  }
};

module.exports.delete = async function (req, res) {
  if (!req || !req.params || !req.params.id) {
    genericHelpers.jsonResult(res, 501, {'message': 'Params required!'});
    return;
  }

  try {
    await UserModel.destroy({where: { id: req.params.id }});
    genericHelpers.jsonResult(res, 200, {'message': 'userDeleted'});
  } catch (error) {
    console.log(error);
    genericHelpers.jsonResult(res, 503, error);
  }


};


