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

    await queryInterface.bulkInsert('Textbooks', [
      {
        // From. Added 小島佑太 2024.06.17
        textbookName: 'ソフトウェア工学の教科書',
        // To. Added 小島佑太 2024.06.17
        subjectName: 'ソフトウェア工学',
        // From. Changed 小島佑太 2024.06.17
        professorName: '中島毅',
        // To. Changed 小島佑太 2024.06.17
        // From. Deleted 小島佑太 2024.06.17
        //omiya: false,
        //toyosu: true,
        // To. Deleted 小島佑太 2024.06.17
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // From. Added 小島佑太 2024.06.17
        textbookName: '高度情報演習1Bの教科書',
        // To. Added 小島佑太 2024.06.17
        subjectName: '高度情報演習1B',
        // From. Changed 小島佑太 2024.06.17
        professorName: '中島毅',
        // To. Changed 小島佑太 2024.06.17
        // From. Deleted 小島佑太 2024.06.17
        //omiya: false,
        //toyosu: true,
        // To. Deleted 小島佑太 2024.06.17
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Textbooks', null, {});
  }
};
