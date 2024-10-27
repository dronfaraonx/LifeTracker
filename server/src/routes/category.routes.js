const express = require('express');
const { Category } = require('../../db/models');

const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
 try {
    const categories = await Category.findAll({

    });
    console.log(JSON.stringify(categories));
    
    res.json(categories);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Ошибка получении категорий'}); 
  }
});

// shopRouter.get('/:id', async (req, res) => {
//   const {id} = req.params;
//   try {
//     const onePlant = await Plant.findByPk(id);
//     res.status(200).json(onePlant)
//   } catch (error) {
//     console.log('Error', error)
//     res.status(500).json({message: 'Ошибка на сервере'})
//   }
// })
module.exports = categoryRouter; 
