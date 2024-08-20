'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let textbookData = getTextbookData();
    const dummyData = [
      { subjectName: 'this is not textbook', professorName: 'this is not textbook', textbookName: 'this is not textbook' },
    ];
    textbookData = [...dummyData, ...textbookData];
    await queryInterface.bulkInsert('Textbooks', textbookData.map(data => ({
      subjectName: data.subjectName,
      professorName: data.professorName,
      textbookName: data.textbookName,
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
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


function getTextbookData() {
  const directoryPath = path.join(__dirname, '../textbooks'); // ディレクトリのパスを設定
  let textbookData = [];

  // 再帰的にディレクトリを探索する関数
  function readDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readDirectory(filePath); // サブディレクトリの場合は再帰
      } else if (path.extname(file) === '.txt') {
        // テキストファイルを読み込む
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');

        lines.forEach(line => {
          const parts = line.split(', ');
          //全てのpartsから，\rを削除
          parts.forEach((part, index) => {
            parts[index] = part.replace(/\r/g, '');
          });
          if (parts.length === 3) {
            const element = { subjectName:parts[1], professorName:parts[2], textbookName:parts[0] };
            textbookData.push(element);
            console.log(element);
          }
        });
      }
    });
  }

  readDirectory(directoryPath);
  return textbookData;
}
