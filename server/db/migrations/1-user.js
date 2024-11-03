'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      hashpass: {
        type: Sequelize.STRING
      },
      isSeller: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      alreadyBought: {
        type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      house: {
        type: Sequelize.STRING
      },
      apartment: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      contactMethod: {
        type: Sequelize.STRING
      },
      contactValue: {
        type: Sequelize.STRING
      },
      wishList_id: {
        type: Sequelize.INTEGER
      },
      shoppingCartItem: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};