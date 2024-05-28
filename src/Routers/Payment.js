const express = require('express');
const Payment = express.Router();
const {createPayment,getPayment,getPayments} = require('../Controllers/Payment')

Payment.post("/create", createPayment);
Payment.get("/get/:id", getPayment);
Payment.get("/getAll", getPayments);


module.exports = Payment