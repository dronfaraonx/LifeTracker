'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auction_Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Auction_Bid.init({
    plant_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    bid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Auction_Bid',
  });
  return Auction_Bid;
};