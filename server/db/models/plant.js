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
    static associate({Category}) {
      this.belongsTo(Category, {foreignKey: "category_id"})
      // define association here
    }
  }
  Plant.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    photo: DataTypes.STRING,
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