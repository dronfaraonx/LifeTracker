// const app = require("./app")
const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { db } = require("../server/db/models/order");

const authRouter = require("./src/routes/auth.routes");
const shopRouter = require("./src/routes/shop.routes");
const categoryRouter = require("./src/routes/category.routes");
const plantsRouter = require("./src/routes/plants.routes");
const seedsRouter = require("./src/routes/seeds.routes");
const clonesRouter = require("./src/routes/clones.routes");
const cartRouter = require("./src/routes/cart.routes");
const orderRouter = require("./src/routes/order.routes");
const userInfoRouter = require("./src/routes/userInfo.routes");
const passwordRouter = require("./src/routes/password.routes");
// const userSession = require('./src/middleware/getUser');

const app = express();

const PORT = process.env.PORT || 8000;

const serverConfig = require("./src/middleware/serverConfig");
const sessionConfig = require("./src/middleware/sessionConfig");

sessionConfig(app);
serverConfig(app);

app.use("/api/auth", authRouter);
app.use("/api/plants", shopRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/allplants", plantsRouter);
app.use("/api/allseeds", seedsRouter);
app.use("/api/allclones", clonesRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/userInfo", userInfoRouter);
app.use("/api/passwordUpdate", passwordRouter);

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/send-order", (req, res) => {
  const { cart, total, user } = req.body;

  const formatOrderItems = (cart) => {
    return cart
      .map(
        (item) => `
        <div style="margin-bottom: 10px; border: 1px solid #ccc; padding: 5px; border-radius: 5px; font-size: 12px;">
        <h4 style="margin: 0; font-size: 14px;">${item.name}</h4>
        <img src="${item.photo}" alt="Plant Photo" style="width: 100px; height: auto;"> <!-- Измените ширину для уменьшения размера изображения -->
        <p style="margin: 2px 0;"><strong>Количество:</strong> ${item.quantity}</p>
        <p style="margin: 2px 0;"><strong>Цена за 1 товар:</strong> ${item.pricePurchanse} р.</p>
      </div>
      `
      )
      .join("");
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Подтверждение заказа",
    html: `
      <h1>Уважаемый продавец, у вас новый заказ!!!</h1>
      <h2>Информация покупателя:</h2>
      <p><strong>Имя покупателя:</strong> ${user.firstName} ${user.lastName}</p>
      <p><strong>Телефон:</strong> ${user.phone}</p>
      <p><strong>Город:</strong> ${user.city}</p>
      <p><strong>Адрес:</strong> ${user.zip}, ул. ${user.address}, дом ${user.house}, кв. ${user.apartment}</p>
      <p><strong>Способ связи:</strong>${user.contactValue}</p>
      <h3>Детали заказа:</h3>
      ${formatOrderItems(cart)}
      <p><strong>Общая сумма:</strong> ${total} р.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(PORT, () => {
  console.log("SERVER STARTED ON PORT", PORT);
});
