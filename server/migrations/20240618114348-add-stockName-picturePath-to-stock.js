'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Stocks', 'picturePath', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    await queryInterface.addColumn('Stocks', 'stockName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stocks', 'picturePath');
  }
};
