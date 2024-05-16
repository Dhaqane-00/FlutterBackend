const express = require('express');
const order = express.Router();
const {createOrder,getOrderById,getAllOrders,updateOrder,deleteOrderById} = require('../Controllers/Order')


order.post ("/createOrder", createOrder);
order.get("/getAllOrders", getAllOrders);
order.get ("/getOrderById/:Id", getOrderById);
order.patch ("/updateOrder/:Id",updateOrder);
order.delete ("/deleteOrderById/:Id",deleteOrderById);




module.exports = order;