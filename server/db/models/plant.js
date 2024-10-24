'use strict';
const {
  Model
} = require('sequelize');
const PlantCategory = require('../migrations/9-plant-category');
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Inventory, Category, Plant, Order, Order_item}) {
      this.hasOne(Inventory, 
        {foreignKey: "plant_id"}
      ),
      this.belongsToMany(Category, {through: PlantCategory}),
      this.belongsToMany(Plant, {through: Cart_Plant}),
      this.belongsToMany(Order, {through: Order_item})

    }
  }
  Plant.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plant',
  });
  return Plant;
};