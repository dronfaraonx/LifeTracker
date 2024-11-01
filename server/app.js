// const app = require("./app")
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config()
const { db } = require('../server/db/models/order');

const authRouter = require('./src/routes/auth.routes')
const shopRouter = require('./src/routes/shop.routes')
const categoryRouter = require('./src/routes/category.routes');
const plantsRouter = require('./src/routes/plants.routes');
const seedsRouter = require('./src/routes/seeds.routes');
const clonesRouter = require('./src/routes/clones.routes');
const cartRouter = require('./src/routes/cart.routes')
const orderRouter = require('./src/routes/order.routes');
const userInfoRouter = require('./src/routes/userInfo.routes');
// const userSession = require('./src/middleware/getUser');

const app = express();

const PORT = process.env.PORT || 8000;

const serverConfig = require('./src/middleware/serverConfig')
const sessionConfig = require('./src/middleware/sessionConfig');


sessionConfig(app)
serverConfig(app);

app.use('/api/auth', authRouter);
app.use('/api/plants', shopRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/allplants', plantsRouter)
app.use('/api/seeds', seedsRouter)
app.use('/api/clones', clonesRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)
app.use('/api/userInfo', userInfoRouter)

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

app.post('/api/send-order', (req, res) => {
  const { cart, total, user } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, 
    subject: 'Order Confirmation',
    text: `New Order Details:\n\nUser: ${user.firstName} ${user.lastName}\nPhone: ${user.phone}\nCity: ${user.city}\nAddress: ${user.address}\n\nOrder Items:\n${JSON.stringify(cart, null, 2)}\nTotal: ${total} р.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error); 
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});



app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT', PORT);
});