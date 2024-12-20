'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, Cart, Order}) {
      this.belongsTo(Category, {foreignKey: "category_id"})
      this.hasMany(Cart, {foreignKey: 'plant_id'})
      // this.hasMany(Order, { foreignKey: "plant_id" })
    }
  }
  Plant.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plant',
  });
  return Plant;
};