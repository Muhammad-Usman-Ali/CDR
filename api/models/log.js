module.exports = (sequelize, type) => {
  return sequelize.define('log', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    statusCode: type.INTEGER,
    status: type.STRING,
    message: type.TEXT
  });
};
