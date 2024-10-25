'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Categories', [
      {
      name: 'Растения',
      createdAt: new Date(),
      updatedAt: new Date()
    },
     {
      name: 'Клоны',
      createdAt: new Date(),
      updatedAt: new Date()
    },
     {
      name: 'Семена',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
    /**
     *
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
