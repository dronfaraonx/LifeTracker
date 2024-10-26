// const app = require("./app")
const express = require('express');
require('dotenv').config()

const authRouter = require('./src/routes/auth.routes')
const shopRouter = require('./src/routes/shop.routes')
// const userSession = require('./src/middleware/getUser');

const app = express();

const PORT = process.env.PORT || 8000;

const serverConfig = require('./src/middleware/serverConfig')
const sessionConfig = require('./src/middleware/sessionConfig')


sessionConfig(app)
serverConfig(app);

app.use('/api/auth', authRouter);
app.use('/api/plants', shopRouter)


app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT', PORT);
});