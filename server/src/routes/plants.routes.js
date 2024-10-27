const express = require('express');
const { Plant } = require('../../db/models');

const plantsRouter = express.Router();

plantsRouter.get('/', async (req, res) => {
  try {
    const plants = await Plant.findAll({ where: { category_id: 1 } });
    console.log(JSON.stringify(plants));
    
    res.json(plants);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Ошибка получении растений' }); 
  }
});

module.exports = plantsRouter;
