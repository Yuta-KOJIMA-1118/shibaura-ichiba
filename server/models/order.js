'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Student, {
        foreignKey: 'studentId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Order.belongsTo(models.Stock, {
        foreignKey: 'stockId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Order.hasMany(models.Chat, {
        foreignKey: 'orderId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Order.init({
    studentId: DataTypes.INTEGER,
    stockId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};