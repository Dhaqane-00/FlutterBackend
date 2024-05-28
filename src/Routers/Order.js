const express = require('express');
const order = express.Router();
const {createOrder,getOrders} = require('../Controllers/Order')

order.post("/createOrder", createOrder);
order.get("/getOrders", getOrders);
module.exports = order;