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
    static associate({User, Plant}) {
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.belongsTo(Plant, {foreignKey: 'plant_id'})
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    plant_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};