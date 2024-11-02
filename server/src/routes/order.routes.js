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
        user_id: req.session.user_sid,
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





orderRouter.get("/user/", async (req, res) => {
  const user_id = req.session.user_sid
  
  try {
    const orders = await Order.findAll({
      where: { user_id },
      attributes: ['uuid_order', 'createdAt'],
    });
    console.log('my user order',orders);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения списка" });
  }
});

orderRouter.get("/order-details/:uuid_order", async (req, res) => {
  // const user_id = req.session.user_sid
  const {uuid_order} = req.params
  console.log('this is my uuid_order', uuid_order);
  
  try {
    const orders = await Order.findAll({
       where: { uuid_order },
      include: [
        {
          model: Plant,
          attributes: ['name', 'photo', 'type'],
        },
      ],
    });
     if (orders.length === 0) {
      return res.status(404).json({ error: "Заказ не найден." });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения списка" });
  }
});
module.exports = orderRouter;
