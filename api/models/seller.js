module.exports = (sequelize, type) => {
  return sequelize.define(
    'seller',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING,
      i_tariff: type.STRING
    },
    // {
    //   indexes: [{
    //     fields: ['end_stamp', 'reseller']
    //   },
    //   {
    //     fields: ['end_stamp']
    //   }]
    // }
  );
};
