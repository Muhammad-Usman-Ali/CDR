module.exports = (sequelize, type) => {
  return sequelize.define(
    'rate',
    {
      id: {
        type: type.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      price        : type.STRING,
      prefix       : type.STRING,
      date         : type.DATEONLY,
      minutes      : { type: type.STRING, defaultValue: '0' },
      routeType    : type.STRING,
      sellerName   : type.STRING,
      // country      : type.STRING,
      // operatorName : type.STRING,
    },
    {
      indexes: [
        {
          fields: ['prefix']
        },
        {
          fields: ['prefix', 'date', 'routeType']
        }
      ],
      timestamps: false
    }
  );
};
