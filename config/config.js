const fs = require('fs');


// Connection string to the database
var dbName = 'simshield';
var userName = 'Rahmat';
var dbPassword = 'rahmat';

// simshield dbName, simshieldDB username, rahmat password
if (process.env.NODE_ENV === 'production') {
    dbName = process.env.PROD_DB_NAME;
    userName = process.env.PROD_USER_NAME;
    dbPassword = process.env.PROD_DB_PASSWORD;

    console.log(dbName, userName, dbPassword, process.env.PROD_MY_SECRET);
}


module.exports = {
  development: {
    username: userName,
    password: dbPassword,
    database: dbName,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: userName,
    password: dbPassword,
    database: dbName,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: userName,
    password: dbPassword,
    database: dbName,
    host: '127.0.0.1',
    dialect: 'postgres',
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/postgres-ca-master.crt')
    //   }
    // }
  }
};