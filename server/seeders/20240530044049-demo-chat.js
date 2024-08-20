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
    
    const orders = await queryInterface.sequelize.query(
      `SELECT id, studentId, stockId FROM Orders LIMIT 1`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const seller = await queryInterface.sequelize.query(
      `SELECT studentId FROM Stocks WHERE id = ${orders[0].stockId} `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const now = new Date();
    const oneMinuteAgo = new Date(now);
    oneMinuteAgo.setMinutes(now.getMinutes() - 1);
    const twoMinutesAgo = new Date(now);
    twoMinutesAgo.setMinutes(now.getMinutes() - 2);
    const threeMinutesAgo = new Date(now);
    threeMinutesAgo.setMinutes(now.getMinutes() - 3);
    
    await queryInterface.bulkInsert('Chats', [
      {
        senderStudentId: orders[0].studentId,
        orderId: orders[0].id,
        content: '値下げしてください！',
        createdAt: threeMinutesAgo,
        updatedAt: threeMinutesAgo
      },
      {
        senderStudentId: seller[0].studentId,
        orderId: orders[0].id,
        content: 'いやです',
        createdAt: twoMinutesAgo,
        updatedAt: twoMinutesAgo
      },
      {
        senderStudentId: orders[0].studentId,
        orderId: orders[0].id,
        content: 'そこをなんとか(*-ω人)',
        createdAt: oneMinuteAgo,
        updatedAt: oneMinuteAgo
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
    await queryInterface.bulkDelete('Chats', null, {});
  }
};
