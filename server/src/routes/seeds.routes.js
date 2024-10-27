const express = require('express');
const { Plant } = require('../../db/models');

const seedsRouter = express.Router();

seedsRouter.get('/', async (req, res) => {
  try {
    const seeds = await Plant.findAll({ where: { category_id: 3 } });
    console.log(JSON.stringify(seeds));
    
    res.json(seeds);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Ошибка получении семян' }); 
  }
});

module.exports = seedsRouter;
