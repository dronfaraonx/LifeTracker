'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Plants', [
     {
        name: 'Бамбино Пинк',
        description: 'Алоказия Бамбино — миниатюрное растение с узкими тёмно-зелёными листьями и яркими прожилками. ',
        photo: 'https://sun9-79.userapi.com/s/v1/ig2/7GxuyfqEJYwIYFGBlcQ_MHAcH-tzKbChiXYIogWdLsaZIij9Yti5nvKyQrZE145IZzBkulGPEUcgRvk-BSvhdUUV.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,1600x1600&from=bu&u=k6m7wQpg3U6SdHPO35tamE7iJpCE5m4n4t1D7OIQjI4&cs=510x510',
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
        photo: 'https://i.etsystatic.com/23449873/r/il/44202f/4497245548/il_570xN.4497245548_d7yy.jpg',
        price: 1900,
        category_id: 2,
        type: 'Монстера',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Бурле Маркс',
        description: 'редкое и популярное растение с уникальной пестрой листвой. ',
        photo: 'https://traumseerose.de/media/image/ce/1a/31/430782370_914795863728822_381182605561828458_n.jpg',
        price: 3200,
        category_id: 2,
        type: 'Монстера',
        createdAt: new Date(),
        updatedAt: new Date()
       },
        {
        name: 'Желтый Мерлин',
        description: 'редкое и популярное растение с уникальной пестрой листвой. ',
        photo: 'https://orchidbox.io/cdn/shop/files/924fd4e0-0edb-4f66-87e7-f08a40cb977d_1500x.jpg?v=1708462614',
        price: 6500,
        category_id: 2,
        type: 'Монстера',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Ливистона Ротундифолия',
        description: 'Семена пальм в наличии',
        photo: '/images/seeds/4.webp',
        price: 100,
        category_id: 3,
        type: 'Пальма',
        createdAt: new Date(),
        updatedAt: new Date()
       },
         {
        name: 'Коперниция Прунифера',
        description: 'lorem',
        photo: '/images/seeds/10.webp',
        price: 100,
        category_id: 3,
        type: 'Пальма',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Дипсис желтоватый',
        description: 'Растение предпочитает яркий рассеянный свет и регулярный полив.',
        photo: '/images/seeds/3.webp',
        price: 80,
        category_id: 3,
        type: 'Пальма',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: ' Замифолия',
        description: 'легантное комнатное растение с плотными, глянцевыми листьями, выносливое к недостатку света и засухе, прекрасно очищает воздух.',
        photo: 'https://sun9-40.userapi.com/s/v1/ig2/h8mwecy-sTNl-r3snYiu4HhqQ9F3rl3XX011Ndu2SFzdkcjMCIdkixh7oirOB4kXc5_OYEVhV4jsXVz5rAHfk_Ur.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,1600x1600&from=bu&u=gRZUCeLoxTQ1aWU23CJVT_M82ioX4vVK3yVdFUjloeo&cs=510x510',
        price: 1200,
        category_id: 1,
        type: 'Замиокулькас',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Ливистона Ротундуфолия',
        description: 'редкое и популярное растение с уникальной пестрой листвой. Его крупные зеленые листья украшают кремовые и белые вкрапления, что придает ему особую декоративность.',
        photo: '/images/seeds/7.webp',
        price: 80,
        category_id: 3,
        type: 'Пальма',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Ливистона Ротундифолия',
        description: 'редкое и популярное растение с уникальной пестрой листвой. Его крупные зеленые листья украшают кремовые и белые вкрапления, что придает ему особую декоративность.',
        photo: '/images/seeds/6.webp',
        price: 90,
        category_id: 3,
        type: 'Пальма',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Ред Конго',
        description: 'редкое и популярное растение с уникальной пестрой листвой. Его крупные зеленые листья украшают кремовые и белые вкрапления, что придает ему особую декоративность.',
        photo: 'https://club.global.flowers/upload/iblock/f10/a90h4lttrracer1egrv98fivkupah7yg/125897.webp',
        price: 9900,
        category_id: 1,
        type: 'Филодендрон',
        createdAt: new Date(),
        updatedAt: new Date()
       }
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
