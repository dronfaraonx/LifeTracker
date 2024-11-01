// const app = require("./app")
const express = require('express');
require('dotenv').config()

const authRouter = require('./src/routes/auth.routes')
const shopRouter = require('./src/routes/shop.routes')
const categoryRouter = require('./src/routes/category.routes');
const plantsRouter = require('./src/routes/plants.routes');
const seedsRouter = require('./src/routes/seeds.routes');
const clonesRouter = require('./src/routes/clones.routes');
const cartRouter = require('./src/routes/cart.routes')
const orderRouter = require('./src/routes/order.routes');
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




app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT', PORT);
});