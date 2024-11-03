const express = require('express');
const { Plant } = require('../../db/models');

const clonesRouter = express.Router();

clonesRouter.get('/', async (req, res) => {
  try {
    const clones = await Plant.findAll({ where: { category_id: 2 } });

    console.log('clones: ', clones);
    
    res.json(clones);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Ошибка получении клонов' }); 
  }
});

module.exports = clonesRouter;
