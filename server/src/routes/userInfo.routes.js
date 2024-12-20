const express = require("express");
const { User } = require("../../db/models");

const userInfoRouter = express.Router();

userInfoRouter.get("/:id", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { id: req.params.id },
      // attributes: ["firstName", "email", "lastName", "phone", "city", "address"],
    });
    if (userInfo) {
      res.json(userInfo);
    } else {
      res.status(419).json({ message: "Информация о юзере не найдена" });
    }
  } catch (error) {
    console.error("Ошибка получения информации", error);
    res.status(500).json({ message: "Server error" });
  }
});

userInfoRouter.put("/", async (req, res) => {
  const id = req.session.user_sid;
  const {
    firstName,
    lastName,
    phone,
    city,
    address,
    house,
    apartment,
    zip,
    contactMethod,
    contactValue,
  } = req.body;

  if (!firstName || !lastName || !phone || !city || !address) {
    return res.status(400).json({ error: "Заполните всю информацию." });
  }

  try {
    let user = await User.findOne({ where: { id } });

    if (user) {
      if (user.alreadyBought) {
        await user.update({
          firstName,
          lastName,
          phone,
          city,
          address,
          house,
          apartment,
          zip,
          contactMethod,
          contactValue,
        });
        res.status(200).json({ message: "Информация изменена", user });
      } else {
        await user.update({
          firstName,
          lastName,
          phone,
          city,
          address,
          alreadyBought: true,
          house,
          apartment,
          zip,
          contactMethod,
          contactValue });
        res.status(200).json({ message: 'Информация добавлена и статус покупки обновлен', user });
      }
    }
  } catch (error) {
    console.error("Ошибка при добавлении информации о юзере:", error);
    res.status(500).json({ error: "Ошибка при добавлении информации о юзере" });
  }
});

module.exports = userInfoRouter;
