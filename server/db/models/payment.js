'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order}) {
      this.belongsTo(Order, {
        foreignKey: 'order_id'
      })
      // define association here
    }
  }
  Payment.init({
    order_id: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    payment_status: DataTypes.BOOLEAN,
    payment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};