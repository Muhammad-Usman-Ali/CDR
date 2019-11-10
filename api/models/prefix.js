module.exports = (sequelize, type) => {
  return sequelize.define(
    'prefix',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      prefix: type.STRING,
      country: type.STRING,
      operatorName: type.STRING
      // isFavorite: { type: type.BOOLEAN, defaultValue: false }
    },
    {
      indexes: [{
        fields: ['prefix']
      },
      // {
      //   fields: ['end_stamp']
      // }
      ], 
      timestamps: false
    }
  );
};
