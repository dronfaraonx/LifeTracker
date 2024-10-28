'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class All_Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  All_Order.init({
    order_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    totalSum: DataTypes.INTEGER,
    orderDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'All_Order',
  });
  return All_Order;
};