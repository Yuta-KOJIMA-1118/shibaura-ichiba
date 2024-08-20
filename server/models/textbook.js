'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Textbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Textbook.hasMany(models.Stock, {
        foreignKey: 'textbookId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Textbook.hasMany(models.Timetable, {
        foreignKey: 'textbookId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Textbook.init({
    subjectName: DataTypes.STRING,
    professorName: DataTypes.STRING,
    // From. Added 小島佑太 2024.06.17
    textbookName: DataTypes.STRING,
    // To. Added 小島佑太 2024.06.17

    // From. Deleted 小島佑太 2024.06.17
    //omiya: DataTypes.BOOLEAN,
    //toyosu: DataTypes.BOOLEAN
    // To. Deleted 小島佑太 2024.06.17
  }, {
    sequelize,
    modelName: 'Textbook',
  });
  return Textbook;
};