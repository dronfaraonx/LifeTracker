const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { Order, Cart, Plant } = require('../../db/models');

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
  const uuid_order = uuidv4().slice(0, 8);
  const { cartItems } = req.body;
  const { user } = res.locals;

  if (!user || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Нет юзера или заказа' });
  }

  try {
    const orderPromises = cartItems.map((item) =>
      Order.create({
        user_id: item.user_id,
        plant_id: item.plant_id,
        uuid_order: uuid_order,
        quantity: item.quantity,
        pricePurchase: item.pricePurchanse,
      })
    );

    await Promise.all(orderPromises);

    await Cart.destroy({ where: { user_id: user.id } });

    res.status(201).json({ message: 'Заказ создан' });
  } catch (error) {
    console.error('Ошибка создания заказа', error);
    res.status(500).json({ error: 'Ошибка создания заказа' });
  }
});



// orderRouter.get("/user/all", async (req, res) => {
//   const user_id = req.session.user_sid
  
//   try {
//     const orders = await Order.findAll({
//       where: { user_id },
//       attributes: ['uuid_order', 'createdAt'],
//     });
//     console.log('my user order', orders);
//     res.json(orders);
//     console.log('my user order',orders);
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: "Ошибка получения списка" });
//   }
// });


orderRouter.get("/user/", async (req, res) => {
  const user_id = req.session.user_sid
  
  try {
    const orders = await Order.findAll({
      where: { user_id },
      include: [
        {
          model: Plant,
          attributes: ['name', 'photo'],
        },
      ],
    });
    console.log('my user order',orders);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения списка" });
  }
});

module.exports = orderRouter;
