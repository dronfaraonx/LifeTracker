'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order}) {
      this.hasMany(Order, {foreignKey : 'user_id'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hashpass: DataTypes.STRING,
    isSeller: DataTypes.BOOLEAN,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    birth: DataTypes.STRING,
    wishList_id: DataTypes.INTEGER,
    shoppingCartItem: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};