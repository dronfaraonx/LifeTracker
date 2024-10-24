'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auction_Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Auction_Plant.init({
    plant_name: DataTypes.STRING,
    description: DataTypes.STRING,
    start_price: DataTypes.INTEGER,
    finish_date: DataTypes.DATE,
    seller_id: DataTypes.INTEGER,
    early_price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    current_bid: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Auction_Plant',
  });
  return Auction_Plant;
};