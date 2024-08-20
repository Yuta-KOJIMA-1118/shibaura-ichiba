'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.belongsTo(models.Student, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Stock.belongsTo(models.Textbook, {
        foreignKey: 'textbookId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Stock.hasMany(models.Order, {
        foreignKey: 'stockId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Stock.init({
    studentId: DataTypes.INTEGER,
    textbookId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    state: DataTypes.BOOLEAN,
    // From. Added 小島佑太 2024.06.18
    stockName: DataTypes.STRING,
    picturePath: DataTypes.TEXT,
    // To. Added 小島佑太 2024.06.18
    explanation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};