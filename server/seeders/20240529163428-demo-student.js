'use strict';

const { name } = require('ejs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Students', [
      {
        name: 'mitsuki',
        password: 'al22085',
        omiya: false,
        toyosu: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ayata',
        password: 'al22053',
        omiya: false,
        toyosu: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'nanako',
        password: 'al22033',
        omiya: false,
        toyosu: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ryota',
        password: 'al22022',
        omiya: false,
        toyosu: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'senri',
        password: 'al22069',
        omiya: false,
        toyosu: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'yuta',
        password: 'al22090',
        omiya: false,
        toyosu: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Students', null, {});
  }
};
