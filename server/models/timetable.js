'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Timetable.belongsTo(models.Student, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Timetable.belongsTo(models.Textbook, {
        foreignKey: 'textbookId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Timetable.init({
    studentId: DataTypes.INTEGER,
    textbookId: DataTypes.INTEGER,
    // From. Deleted 小島佑太 2024.06.18
    //period: DataTypes.INTEGER,
    //weekday: DataTypes.INTEGER
    // To. Deleted 小島佑太 2024.06.18
  }, {
    sequelize,
    modelName: 'Timetable',
  });
  return Timetable;
};