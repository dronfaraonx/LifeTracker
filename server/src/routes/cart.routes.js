const express = require('express');
const {Plant, Cart} = require('../../db/models')

const cartRouter = express.Router()

cartRouter.post('/', async (req, res) => {
  const {plant_id, user_id, quantity} = req.body
  try {
    const existPlantInCart = await Cart.findOne({where: {plant_id, user_id}})

    if(existPlantInCart) {
      const newQuantity = existPlantInCart.quantity + quantity;
      await existPlantInCart.update({quantity: newQuantity})
    res.status(201).json({message: 'Растение добавлено в корзину'})
    } else {
    await Cart.create({plant_id, user_id, quantity});
    res.status(201).json({message: 'Растение добавлено в корзину'})
    
    }
  } catch (error) {
    console.log('Ошибка добавления в корзину', error);
    res.status(500).json({message: 'Ошибка корзины'})
  }
})

cartRouter.get('/:id', async (req, res) => {
  const user_id = req.params.id;
  // console.log('this is my user_id', user_id);
  
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
          attributes: ['name', 'price', 'photo', 'type'],
        },
      ],
    });
    const formatedCartData = cartItems.map(item => ({
      id: item.id,
      name: item.Plant.name,
      price: item.Plant.price,
      quantity: item.quantity,
      photo: item.Plant.photo,
      type: item.Plant.type
    }));
    // console.log(formatedCartData);
    res.status(200).json(formatedCartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка получении корзины' });
  }
});

cartRouter.delete('/:userId/plant/:plantId', async (req, res) => {
  const { userId, plantId } = req.params;

  try {
    const cartPlant = await Cart.findOne({
      where: { user_id: userId, id: plantId },
    });

    if (!cartPlant) {
      return res.status(404).json({ message: 'Растение не найдено в корзине' });
    }

    // Получаем текущее количество
    const quantity = cartPlant.quantity;

    // Удаляем растение из корзины
    await Cart.destroy({
      where: { user_id: userId, id: plantId },
    });

    res.status(200).json({ message: 'Растение удалено из корзины', quantity });
  } catch (error) {
    console.error('Ошибка при удалении растения из корзины', error);
    res.status(500).json({ message: 'Ошибка сервера при удалении растения' });
  }
});



module.exports = cartRouter;
