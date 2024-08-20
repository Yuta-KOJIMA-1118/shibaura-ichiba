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

    const students = await queryInterface.sequelize.query(
      `SELECT id, name FROM Students`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const textbooks = await queryInterface.sequelize.query(
      `SELECT id FROM Textbooks`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const stockData = students.map(student => ({
      studentId: student.id,
      price: 1000*student.id,
      textbookId: textbooks[student.id%2].id,
      state: true,
      // From . Added 小島佑太 2024.06.18
      stockName: `${student.name}の出品`,
      picturePath: `public/images/`+student.id+`.jpg`,
      // To. Added 小島佑太 2024.06.18
      explanation: `${student.name}が出品したもの`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Stocks', stockData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Stocks', null, {});
  }
};
