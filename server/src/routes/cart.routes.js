const express = require('express');
const { Op } = require('sequelize');
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

cartRouter.get('/check/:id', async (req, res) => {
  const user_id = req.params.id;

  if (!user_id) {
    return res.json({ message: 'Пользователь не авторизован' });
  }

  try {
    const cartItems = await Cart.findAll({
      where: {
        user_id: user_id 
      },
      attributes: ['quantity'],
    });

    if (cartItems.length === 0) {
      return res.json({ message: 'Корзина пуста' });
    }
    return res.status(200).json(cartItems);
  } catch (error) {
    console.error('Ошибка при получении корзины:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});


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
          attributes: ['id','name', 'price', 'photo', 'type'],
        },
      ],
    });
    const formatedCartData = cartItems.map(item => ({
      id: item.id,
      plant_id: item.Plant.id,
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

// cartRouter.get('/quantity', async (req, res) => {
//   const user_id = req.session.user_sid;

//      try {
//     const cartQuantity = await Cart.findAll({
//       where: { user_id },
//       attributes: ['item_id', 'quantity'] 
//     });

//     console.log(" Quantity:", cartQuantity);
//     res.status(200).json({ cartQuantity });
//   } catch (error) {
//     console.error("Error fetching cart quantity:", error);
//     res.status(500).json({ error: "Failed to retrieve cart quantity" });
//   }
// });

cartRouter.delete('/:userId/plant/:plantId', async (req, res) => {
  const { userId, plantId } = req.params;

  try {
    const cartPlant = await Cart.findOne({
      where: { user_id: userId, id: plantId },
    });

    if (!cartPlant) {
      return res.status(404).json({ message: 'Растение не найдено в корзине' });
    }

    const quantity = cartPlant.quantity;

    await Cart.destroy({
      where: { user_id: userId, id: plantId },
    });

    res.status(200).json({ message: 'Растение удалено из корзины', quantity });
  } catch (error) {
    console.error('Ошибка при удалении растения из корзины', error);
    res.status(500).json({ message: 'Ошибка сервера при удалении растения' });
  }
});

cartRouter.put('/:userId/plant/:plantId', async (req, res) => {
  const { userId, plantId } = req.params;
  const { quantity } = req.body; 

  try {
    const cartPlant = await Cart.findOne({
      where: { user_id: userId, id: plantId },
    });

    if (!cartPlant) {
      return res.status(404).json({ message: 'Растение не найдено в корзине' });
    }

    await Cart.update({ quantity }, { where: { user_id: userId, id: plantId } });

    res.status(200).json({ message: 'Растение обновлено в корзине', quantity });
  } catch (error) {
    console.error('Ошибка при обновлении растения в корзине', error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении растения' });
  }
});



module.exports = cartRouter;
