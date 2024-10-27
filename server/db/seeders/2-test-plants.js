'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Plants', [
     {
        name: 'Бамбино Пинк',
        description: 'Алоказия Бамбино — миниатюрное растение с узкими тёмно-зелёными листьями и яркими прожилками. ',
        photo: 'https://i.etsystatic.com/36450100/r/il/43b32f/4900437417/il_340x270.4900437417_3d59.jpg',
        price: 2900,
        category_id: 2,
        type: 'Алоказия',
        createdAt: new Date(),
        updatedAt: new Date()
       },
         {
        name: 'Сиам',
        description: 'Семена Антуриума Сиам — это отличный способ вырастить экзотическое растение с яркими, восковыми цветками и крупными глянцевыми листьями.',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr009qPtNrnPsFMyBxeThui4YWlpKsdZoR-w&s',
        price: 350,
        category_id: 3,
        type: 'Антуриум',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Тайское созвездие',
        description: 'редкое и популярное растение с уникальной пестрой листвой. ',
        photo: 'https://www.plantvault.com/cdn/shop/files/Large_Variegated_Monstera_Thai_Constellation_for_sale_-_plant_vault_encinitas_california_-_rare_variegated_houseplant.heic?v=1724690998&width=1920',
        price: 6900,
        category_id: 1,
        type: 'Монстера',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Бамбино Пинк',
        description: 'Алоказия Бамбино — миниатюрное растение с узкими тёмно-зелёными листьями и яркими прожилками. ',
        photo: 'https://i.etsystatic.com/36450100/r/il/43b32f/4900437417/il_340x270.4900437417_3d59.jpg',
        price: 2900,
        category_id: 2,
        type: 'Алоказия',
        createdAt: new Date(),
        updatedAt: new Date()
       },
         {
        name: 'Сиам',
        description: 'Семена Антуриума Сиам — это отличный способ вырастить экзотическое растение с яркими, восковыми цветками и крупными глянцевыми листьями.',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr009qPtNrnPsFMyBxeThui4YWlpKsdZoR-w&s',
        price: 350,
        category_id: 3,
        type: 'Антуриум',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Тайское созвездие',
        description: 'редкое и популярное растение с уникальной пестрой листвой. Его крупные зеленые листья украшают кремовые и белые вкрапления, что придает ему особую декоративность.',
        photo: 'https://www.plantvault.com/cdn/shop/files/Large_Variegated_Monstera_Thai_Constellation_for_sale_-_plant_vault_encinitas_california_-_rare_variegated_houseplant.heic?v=1724690998&width=1920',
        price: 6900,
        category_id: 1,
        type: 'Монстера',
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
    await queryInterface.bulkDelete('Plants', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
  }
};
