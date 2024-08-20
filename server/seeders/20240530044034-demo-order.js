'use strict';

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
    
    const stocks = await queryInterface.sequelize.query(
      `SELECT id, studentId FROM Stocks`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const students = await queryInterface.sequelize.query(
      `SELECT id FROM Students`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const validStudentIds = new Set(students.map(student => student.id));

    const orderData = stocks.filter(stock => validStudentIds.has(stock.studentId + 1)).map(stock => ({
      studentId: stock.studentId + 1,
      stockId: stock.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    await queryInterface.bulkInsert('Orders', orderData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
