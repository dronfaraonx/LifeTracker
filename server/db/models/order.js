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
    static associate({User, Payment, Plant}) {
      this.belongsTo(User, 
        {
          foreignKey: 'user_id'
        }
      ),
      this.hasOne(Payment,
        {
          foreignKey: 'order_id'
        }
      ),
      this.belongsToMany(Plant, {through: Order_item})
      // define association here
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    order_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};