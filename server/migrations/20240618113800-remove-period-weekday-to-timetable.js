'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Timetables', 'period');
    await queryInterface.removeColumn('Timetables', 'weekday');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Timetables', 'period', {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 6
      }
    });
    await queryInterface.addColumn('Timetables', 'weekday', {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
        max: 6
      }
    });
  }
};
