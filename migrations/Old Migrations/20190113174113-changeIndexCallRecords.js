'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return queryInterface.removeIndex('callrecords', 'callrecords_start_stamp_end_stamp')
        .then(() => queryInterface.addIndex('callrecords', ['end_stamp']));
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeIndex('callrecords', 'callrecords_end_stamp')
   .then(() => queryInterface.addIndex('callrecords', ['start_stamp','end_stamp']));
  }
};
