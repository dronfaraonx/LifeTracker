const express = require('express');
const { Plant } = require('../../db/models');

const shopRouter = express.Router();

shopRouter.get('/', async (req, res) => {
  try {
    // console.log('------------->',res.locals.user);
    
    const plants = await Plant.findAll();
    // console.log(JSON.stringify(plants));
    
    res.json(plants);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Ошибка получении растений'}); 
  }
});

shopRouter.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const onePlant = await Plant.findByPk(id);
    res.status(200).json(onePlant)
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({message: 'Ошибка на сервере'})
  }
})
module.exports = shopRouter; 
