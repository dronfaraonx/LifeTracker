'use strict';
const {
  Model
} = require('sequelize');
const plant = require('./plant');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Plant}) {
      this.belongsToMany(Plant, {
        through: 'PlantCategory'
      })
    }
  }
  Category.init({
    plant_id: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};