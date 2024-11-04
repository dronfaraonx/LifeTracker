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
        photo: 'https://4.downloader.disk.yandex.ru/preview/fb85d83e33f68bf418da0f21bc00ce1faabf88fcbc7da14939f296b736357ce9/inf/kEbSGVFP5piDQouKJziz9E7s04oAjqDccRLDzs11MxPgkPby3CCRjPCJrhrpbp1TYeQ44Ly1nkR88jLWYS695A%3D%3D?uid=2043300011&filename=29.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=2043300011&tknv=v2&size=1920x992',
        price: 1900,
        category_id: 2,
        type: 'Монстера',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Бурле Маркс',
        description: 'редкое и популярное растение с уникальной пестрой листвой. ',
        photo: 'https://1.downloader.disk.yandex.ru/preview/af5939e2c63a8e945338e45c0dc6668ba96f2c91c868ab395a1b4402163f3a4d/inf/oC79399NoKkxRtm3eqBzU87OSuVJTGw4IgN1zpJykiiLThlXCEeaEOHA08Jh2kTMRYuw83_apruXY8dHZpjq6Q%3D%3D?uid=2043300011&filename=33.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=2043300011&tknv=v2&size=1920x992',
        price: 3200,
        category_id: 2,
        type: 'Монстера',
        createdAt: new Date(),
        updatedAt: new Date()
       },
        {
        name: 'Желтый Мерлин',
        description: 'редкое и популярное растение с уникальной пестрой листвой. ',
        photo: 'https://3.downloader.disk.yandex.ru/preview/87f0977d20d256b697eeff0f4217e5371f3a71a3e5d1bd04329d09c964116270/inf/aeYXSyK9jwfPf3f7ksAX5k-Idi7A7CYSi-n9-4q4FKuHZX2fc-PEEGWd1Dci2Zeb3YOXsRoaCvV9u9o-erWlNQ%3D%3D?uid=2043300011&filename=35.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=2043300011&tknv=v2&size=1920x992',
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
        photo: 'https://3.downloader.disk.yandex.ru/preview/cb3f83cdb0e0e357c91276d69f73227955b145779c5782c9751a2604d09c5235/inf/Kb-ufMrpxlCrtaXwph1VnWp0XFOKQgFw6J3y0gIcIZX2WgZkTmq-BW7a8e_nEyjUeBM3_IMwsbJ4Jza0i8qCww%3D%3D?uid=2043300011&filename=2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=2043300011&tknv=v2&size=1920x992',
        price: 80,
        category_id: 3,
        type: 'Пальма',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Ливистона Ротундифолия',
        description: 'редкое и популярное растение с уникальной пестрой листвой. Его крупные зеленые листья украшают кремовые и белые вкрапления, что придает ему особую декоративность.',
        photo: 'https://4.downloader.disk.yandex.ru/preview/dd6e6c14a7815078042b655f2e2b69ebb7d50e73ef8e891c5cfc3293a0759f3c/inf/jrXgtvGpNpuuy7gKUkb1nlHIJ8wE5YdMBQo8iLK8G88_ZivwuMn7YRpK24cmbOLEWKImRGzXNk-xgvpP9FTH-g%3D%3D?uid=2043300011&filename=4.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=2043300011&tknv=v2&size=1920x992',
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
