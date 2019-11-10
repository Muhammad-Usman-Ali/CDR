var Sequelize = require('sequelize');
var User = require('./user');
var Log = require('./log');
// var Seller = require('./seller');
var Rate = require('./rate');
var Prefix = require('./prefix');
// var FavoritePrefix = require('./favoritePrefix');
// const genericHelpers = require('../helpers/genericHelpers');

// Connection string to the database
var dbName = 'cdrdb';
var userName = 'cdruser';
var dbPassword = 'x1b350o';

var host = '127.0.0.1';
var dialect = 'mysql';

var settings = {
  host: host,
  dialect: dialect,
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  },
  // logging: false
};

settings.port = '3306';

// simshield dbName, simshieldDB username, rahmat password
if (process.env.NODE_ENV === 'production') {
  dbName = process.env.PROD_DB_NAME;
  userName = process.env.PROD_USER_NAME;
  dbPassword = process.env.PROD_DB_PASSWORD;

  console.log(dbName, userName, dbPassword, process.env.PROD_MY_SECRET);
}

var sequelize = new Sequelize(dbName, userName, dbPassword, settings 
// var sequelize = new Sequelize('postgres', 'Rahmat', 'rahmat',
  // {  
  //   host: 'localhost',
  //   dialect: 'mysql',
  //   pool: {
  //     max: 9,
  //     min: 0,
  //     idle: 10000
  //   }
  // }
);

// attaching models with database
var UserModel = User(sequelize, Sequelize);
var LogModel = Log(sequelize, Sequelize);
// var SellerModel = Seller(sequelize, Sequelize);
var PrefixModel = Prefix(sequelize, Sequelize);
var RateModel = Rate(sequelize, Sequelize);
// var FavoritePrefixModel = FavoritePrefix(sequelize, Sequelize);



// Many to many - seller <--> prefix
// SellerModel.belongsToMany(PrefixModel, { through: 'PrefixSeller' });
// PrefixModel.belongsToMany(SellerModel, { through: 'PrefixSeller' });

// One to many - seller <-->* rate
// SellerModel.hasMany(RateModel);
// RateModel.belongsTo(SellerModel);

// One to many - prefix <-->* rate
// PrefixModel.hasMany(RateModel);
// RateModel.belongsTo(PrefixModel);


// One to many - user <-->* favoritePrefix
// UserModel.hasMany(FavoritePrefixModel);
// FavoritePrefixModel.belongsTo(UserModel);

// One to many - prefix <-->* favoritePrefix
// PrefixModel.hasMany(FavoritePrefixModel);
// FavoritePrefixModel.belongsTo(PrefixModel);


// checking db connection
sequelize.authenticate()
  .then(() => {
    console.log('Postgre Connected successfully');
  }).catch((err) => {
    console.log(err);
  });
var testUser = UserModel.build( {
  name: 'Admin', userName: 'Admin', password: 'M!h@!l', isAdmin: true
});

var testUser2 = UserModel.build({
  name: 'aaa', userName: 'AAA', password: 'aaaAAA', isAdmin: true
});
var testUser3 = UserModel.build({
  name: 'bbb', userName: 'bbb', password: 'bbbBBB', isAdmin: false
});




// Setting password for default user
UserModel.setPassword(testUser, 'M!h@!l');
UserModel.setPassword(testUser2, 'aaaAAA');
UserModel.setPassword(testUser3, 'bbbBBB');
// {{{{{{  force: true --> will deleted the previous tables and create newer ones.  }}}}}}
// Creating tables and then seeding values in the tables.

var force = true;


// if (process.env.NODE_ENV === 'production') {
//   force = false;
// }

sequelize.sync({alter: true, force: force})
  .then(async () => {
    if(force){
      // let prefix = await PrefixModel.create({name: 'asdf'});


      await Promise.all([testUser.save(), testUser2.save(), testUser3.save()]);
                
      // await LogModel.create({
      //   statusCode: '201',
      //   status: 'Success',
      //   message: 'Successful call',
      //   lastRecordId: '2011221',
      //   lastRecordTime: '2019-05-27 00:00:00'
        
      // });
      
      // let fevPrefix = await FavoritePrefixModel.create({isFavorite: true});
      // user.setFavoritePrefixs(fevPrefix);
      // prefix.setFavoritePrefixs(fevPrefix);

      console.log('Database & tables created!');
    }
  });


module.exports = {
  UserModel,
  LogModel,
  // SellerModel,
  PrefixModel,
  RateModel,
  
  sequelize
};
