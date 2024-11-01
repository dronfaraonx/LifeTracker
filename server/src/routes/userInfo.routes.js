const express = require('express');
const { User } = require('../../db/models');

const userInfoRouter = express.Router();

userInfoRouter.post('/', async (req, res) => {
  const { id, name, uuid_user, firstName, lastName, phone, city, address } = req.body;

  if (!name || !lastName || !phone || !city || !address) {
    return res.status(400).json({ error: 'Заполните всю информацию.' });
  }

  try {
    let user = await User.findOne({ where: { id } });

    if (user) {
      if (user.alreadyBought) {
        await user.update({ firstName, lastName, phone, city, address });
        res.status(200).json({ message: 'Информация изменена', user });
      } else {
        await user.update({ firstName, lastName, phone, city, address, alreadyBought: true });
        res.status(200).json({ message: 'Информация добавлена и статус покупки обновлен', user });
      }
    } else {
      user = await User.create({ uuid_user, firstName, lastName, phone, city, address, alreadyBought: true });
      res.status(201).json({ message: 'Информация о юзере добавлена', user });
    }
  } catch (error) {
    console.error('Ошибка при добавлении информации о юзере:', error);
    res.status(500).json({ error: 'Ошибка при добавлении информации о юзере' });
  }
});

module.exports = userInfoRouter;
