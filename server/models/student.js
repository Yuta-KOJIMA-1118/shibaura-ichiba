'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasMany(models.Stock, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Student.hasMany(models.Order, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Student.hasMany(models.Chat, {
        foreignKey: 'senderStudentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Student.hasMany(models.Timetable, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Student.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    omiya: DataTypes.BOOLEAN,
    toyosu: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};