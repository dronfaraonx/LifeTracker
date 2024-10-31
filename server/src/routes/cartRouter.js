const express = require('express');
const { Cart } = require('../../db/models'); // Убедитесь, что модель корзины импортирована корректно
const cartRouter = express.Router();

cartRouter.delete('/:userId/plant/:plantId', async (req, res) => {
  const { userId, plantId } = req.params;

  try {
    // Удаляем растение из корзины, где userId и plantId совпадают
    const deletedRows = await Cart.destroy({
      where: { user_id: userId, plant_id: plantId },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Растение не найдено в корзине' });
    }

    res.status(200).json({ message: 'Растение удалено из корзины' });
  } catch (error) {
    console.error('Ошибка при удалении растения из корзины', error);
    res.status(500).json({ message: 'Ошибка сервера при удалении растения' });
  }
});

module.exports = cartRouter;
