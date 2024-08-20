'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // カラムの削除
    await queryInterface.removeColumn('Textbooks', 'omiya');
    await queryInterface.removeColumn('Textbooks', 'toyosu');

    // 新しいカラムの追加
    await queryInterface.addColumn('Textbooks', 'textbookName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    // 新しいカラムの削除
    await queryInterface.removeColumn('Textbooks', 'textbookName');

    // 既存のカラムの再追加
    await queryInterface.addColumn('Textbooks', 'omiya', {
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.addColumn('Textbooks', 'toyosu', {
      type: Sequelize.BOOLEAN,
    });
  }
};
