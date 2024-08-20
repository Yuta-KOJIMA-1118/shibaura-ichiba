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
      `SELECT id FROM Students`,
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

    const timetableData = students.map(student => ({
      studentId: student.id,
      textbookId: textbooks[student.id%2].id,
      // From. Deleted 小島佑太 2024.06.18
      //period: student.id%6 + 1,
      //weekday: (student.id + 1234)%7,
      // To. Deleted 小島佑太 2024.06.18
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('Timetables', timetableData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Timetables', null, {});
  }
};
