const express = require('express');
const Payment = express.Router();
const {createPayment,getAllPayments,updatePayment,deletePayment} = require('../Controllers/Payment')

Payment.post ("/createPayment", createPayment);
Payment.get ("/getAllPayments", getAllPayments);
Payment.patch ("/updatePayment/:id", updatePayment);
Payment.delete ("/deletePayment/:id", deletePayment);
module.exports = Payment