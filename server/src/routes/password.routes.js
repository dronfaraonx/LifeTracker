const express = require('express');
const bcrypt = require("bcrypt")
const {User} = require('./../../db/models')

const passwordRouter = express.Router();

passwordRouter.put('/', async (req, res) => {
   const { userId, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.hashpass);
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.hashpass = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Server error' });
  }
})

module.exports = passwordRouter;