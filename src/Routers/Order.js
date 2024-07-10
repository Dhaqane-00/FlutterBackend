const express = require('express');
const order = express.Router();
const {createOrder,getOrders,getUserOrder} = require('../Controllers/Order')

order.post("/createOrder", createOrder);
/**
 * @swagger
 * /api/order/createOrder:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with the provided details
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID of the person placing the order
 *               payment:
 *                 type: string
 *                 description: Payment method (e.g., CASH, WAAFIPAY)
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID of the product
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product
 *               total:
 *                 type: number
 *                 format: float
 *                 description: Total amount for the order
 *               note:
 *                 type: string
 *                 description: Additional note for the order
 *               phone:
 *                 type: string
 *                 description: Phone number of the user
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 payment:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                 total:
 *                   type: number
 *                   format: float
 *                 note:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 _id:
 *                   type: string
 *                   description: Order ID
 *       400:
 *         description: Bad request, typically due to validation errors or payment failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */


order.get("/getUserOrder/:id", getUserOrder);
/**
 * @swagger
 * /api/order/getOrders:
 *   get:
 *     summary: Retrieve a list of orders
 *     description: Retrieve a list of all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: string
 *                   payment:
 *                     type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                   total:
 *                     type: number
 *                     format: float
 *                   note:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   _id:
 *                     type: string
 *                     description: Order ID
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - Access to the resource is denied
 *       404:
 *         description: Orders not found
 *       500:
 *         description: Internal server error
 */

module.exports = order;