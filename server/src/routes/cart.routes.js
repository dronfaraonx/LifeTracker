const express = require('express');
const {Plant, Cart} = require('../../db/models')

const cartRouter = express.Router()

cartRouter.post('/', async (req, res) => {
  const {plant_id, user_id, quantity} = req.body
  try {
    await Cart.create({plant_id, user_id, quantity});
    res.status(201).json({message: 'Растение добавлено в корзину'})
    
  } catch (error) {
    console.log('Ошибка добавления в корзину', error);
    res.status(500).json({message: 'Ошибка корзины'})
  }
})

cartRouter.get('/:id', async (req, res) => {
  const user_id = req.params.id;
  console.log('this is my user_id', user_id);
  
  // Optionally check if the user_id is valid
  if(!user_id) {
    return res.status(401).json({message: 'Пользователь не авторизован'});
  }

  try {
    const cartItems = await Cart.findAll({
      where: {
        user_id: user_id 
      },
      include: [
        {
          model: Plant,
          attributes: ['name', 'price', 'photo'],
        },
      ],
    });
    const formatedCartData = cartItems.map(item => ({
      id: item.id,
      plantId: item.plant_id,
      name: item.Plant.name,
      price: item.Plant.price,
      quantity: item.quantity,
    }));
    console.log(formatedCartData);
    res.status(200).json(formatedCartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка получении корзины' });
  }
});


module.exports = cartRouter;
