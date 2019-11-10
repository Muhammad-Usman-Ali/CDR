module.exports = (sequelize, type) => {
  return sequelize.define(
    'favoriteOperator',
    { 
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      isFavorite: { type: type.BOOLEAN, defaultValue: false }
    },
  );
};
