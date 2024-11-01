const express = require('express');
const { Order, Cart } = require('../../db/models');

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
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
        uuid_order: item.uuid_order,
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

module.exports = orderRouter;
