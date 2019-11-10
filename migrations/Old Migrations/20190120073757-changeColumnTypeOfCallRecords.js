'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   return queryInterface
   .changeColumn('callrecords','start_stamp', {
     type: Sequelize.DATE,
     allowNull: true

   })
   .then(() => {
    return queryInterface
    .changeColumn('callrecords','end_stamp', {
      type: Sequelize.DATE,
      allowNull: true
 
    });
   });

     
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   
   return queryInterface
   .changeColumn('callrecords','start_stamp', {
     type: Sequelize.DATEONLY

   })
   .then(() => {
    return queryInterface
    .changeColumn('callrecords','end_stamp', {
      type: Sequelize.DATEONLY
 
    });
   });
  }
};
