'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Plants', [
     {
        name: 'Бамбино Пинк',
        description: 'Алоказия Бамбино — миниатюрное растение с узкими тёмно-зелёными листьями и яркими прожилками. ',
        photo: 'http://localhost:8000/images/Seeds/Palms/2.png',
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
        photo: 'https://3.downloader.disk.yandex.ru/preview/cb3f83cdb0e0e357c91276d69f73227955b145779c5782c9751a2604d09c5235/inf/Kb-ufMrpxlCrtaXwph1VnWp0XFOKQgFw6J3y0gIcIZX2WgZkTmq-BW7a8e_nEyjUeBM3_IMwsbJ4Jza0i8qCww%3D%3D?uid=2043300011&filename=2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=2043300011&tknv=v2&size=1920x992',
        price: 100,
        category_id: 3,
        type: 'Пальма',
        createdAt: new Date(),
        updatedAt: new Date()
       },
         {
        name: 'Коперниция Прунифера',
        description: 'lorem',
        photo: 'https://4.downloader.disk.yandex.ru/preview/7a366d011b9d9c103f819d131595be5a1e833e9ac6ab41b0bafcd60dca203e5d/inf/W_u4qbn5KhgxpyfRJbjfyLCDn9bVsYuK_91ulLrftAJnzXBDFM4FwpC1OztWYCg_vyzrORH49eerPFYy7-jkzg%3D%3D?uid=2043300011&filename=10.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=2043300011&tknv=v2&size=1920x992',
        price: 100,
        category_id: 3,
        type: 'Пальма',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Дипсис желтоватый',
        description: 'Растение предпочитает яркий рассеянный свет и регулярный полив.',
        photo: 'https://thumb.cloud.mail.ru/thumb/xw1/3.webp',
        price: 80,
        category_id: 3,
        type: 'Пальма',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Лисий Хвост',
        description: 'Растения обладают яркими цветами и нежными листьями, идеальны для тенистых уголков.',
        photo: 'https://3.downloader.disk.yandex.ru/preview/49b3d156a0fe9fdbd6625dbed497e99603abd3086bc34719d50f4dd164066555/inf/HYaDiSwIJKiyZsTfHEGCOHeSMTpCCBvzK0lSI4rBUyntYXN0Nmct_e3V7dEdOtaTFjjVlu532pHfeUzgNFBVpg%3D%3D?uid=2043300011&filename=12.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=2043300011&tknv=v2&size=1920x992',
        price: 80,
        category_id: 3,
        type: 'Пальма',
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
