const express = require('express');
const {Order} =  require('../../db/models')

const orderRouter = express.Router()


orderRouter.post('/', async(req,res) => {
  // const {user_id, producat}
})

module.exports =orderRouter;