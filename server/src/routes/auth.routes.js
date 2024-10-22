const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

const authRouter = express.Router();

authRouter.get("/check-session", (req, res) => {
  
  if (req.session.user_sid) {
    const {user} = res.locals;
    
    res.status(200).json({ user });

  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill out all fields." });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, hashpass });

    req.session.user_sid = newUser.id;

    return res.json({ user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.hashpass);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    req.session.user_sid = user.id;
    return res.json({ user });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

authRouter.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      } else {
        res.clearCookie("user_sid"); 
        return res.status(200).json({ message: "Logged out successfully" });
      }
    });
  } else {
    res.status(400).json({ message: "No active session" });
  }
});



module.exports = authRouter;
