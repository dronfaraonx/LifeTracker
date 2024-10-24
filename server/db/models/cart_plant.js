'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart_Plant.init({
    plant_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart_Plant',
  });
  return Cart_Plant;
};