const express = require('express');
const { Plant } = require('../../db/models');

const shopRouter = express.Router();

shopRouter.get('/', async (req, res) => {
  try {
    const plants = await Plant.findAll();
    console.log(JSON.stringify(plants));
    
    res.json(plants);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Ошибка получении растений'}); 
  }
});

module.exports = shopRouter; 
