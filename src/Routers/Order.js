const express = require('express');
const order = express.Router();
const {createOrder,getOrderById,getAllOrders,updateOrder,deleteOrderById} = require('../Controllers/Order')


order.post ("/createOrder", createOrder);
/**
 * @swagger
 * /api/order/createOrder:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with the provided details
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not found - Product, category, or payment method not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     OrderInput:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product being ordered
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         categoryId:
 *           type: string
 *           description: The ID of the category for the product
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         paymentMethodId:
 *           type: string
 *           description: The ID of the payment method used for the order
 *           example: "60c0d5e7ad21438c6f4c8234"
 *         status:
 *           type: string
 *           description: The status of the order
 *           example: "Pending"
 *         description:
 *           type: string
 *           description: The description of the order
 *           example: "Order for June"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product ordered
 *           example: 2
 *         total:
 *           type: number
 *           description: The total amount for the order
 *           example: 199.98
 *     OrderResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Order created successfully
 *         order:
 *           $ref: '#/components/schemas/Order'
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the order
 *           example: "60b6c0d5f1b60c5f1d8e4a5c"
 *         product:
 *           type: string
 *           description: The ID of the product being ordered
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         category:
 *           type: string
 *           description: The ID of the category for the product
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         user:
 *           type: string
 *           description: The ID of the user who placed the order
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         paymentMethod:
 *           type: string
 *           description: The ID of the payment method used for the order
 *           example: "60c0d5e7ad21438c6f4c8234"
 *         status:
 *           type: string
 *           description: The status of the order
 *           example: "Pending"
 *         description:
 *           type: string
 *           description: The description of the order
 *           example: "Order for June"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product ordered
 *           example: 2
 *         total:
 *           type: number
 *           description: The total amount for the order
 *           example: 199.98
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the order
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 *           example: "2024-05-17T10:00:00.000Z"
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error message describing the issue
 */

order.get("/getAllOrders", getAllOrders);
/**
 * @swagger
 * /api/order/getAllOrders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderListResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     OrderListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the order
 *           example: "60b6c0d5f1b60c5f1d8e4a5c"
 *         product:
 *           type: string
 *           description: The ID of the product being ordered
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         category:
 *           type: string
 *           description: The ID of the category for the product
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         user:
 *           type: string
 *           description: The ID of the user who placed the order
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         paymentMethod:
 *           type: string
 *           description: The ID of the payment method used for the order
 *           example: "60c0d5e7ad21438c6f4c8234"
 *         status:
 *           type: string
 *           description: The status of the order
 *           example: "Pending"
 *         description:
 *           type: string
 *           description: The description of the order
 *           example: "Order for June"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product ordered
 *           example: 2
 *         total:
 *           type: number
 *           description: The total amount for the order
 *           example: 199.98
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the order
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 *           example: "2024-05-17T10:00:00.000Z"
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error message describing the issue
 */

order.get ("/getOrderById/:Id", getOrderById);
/**
 * @swagger
 * /api/order/getOrderById/{Id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve an order by its ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     OrderResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         order:
 *           $ref: '#/components/schemas/Order'
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the order
 *           example: "60b6c0d5f1b60c5f1d8e4a5c"
 *         product:
 *           type: string
 *           description: The ID of the product being ordered
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         category:
 *           type: string
 *           description: The ID of the category for the product
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         user:
 *           type: string
 *           description: The ID of the user who placed the order
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         paymentMethod:
 *           type: string
 *           description: The ID of the payment method used for the order
 *           example: "60c0d5e7ad21438c6f4c8234"
 *         status:
 *           type: string
 *           description: The status of the order
 *           example: "Pending"
 *         description:
 *           type: string
 *           description: The description of the order
 *           example: "Order for June"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product ordered
 *           example: 2
 *         total:
 *           type: number
 *           description: The total amount for the order
 *           example: 199.98
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the order
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 *           example: "2024-05-17T10:00:00.000Z"
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error message describing the issue
 */

order.patch ("/updateOrder/:Id",updateOrder);
/**
 * @swagger
 * /api/order/updateOrder/{Id}:
 *   patch:
 *     summary: Update an order
 *     description: Update an existing order with the provided details
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     OrderInput:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The updated status of the order
 *           example: "Completed"
 *         description:
 *           type: string
 *           description: The updated description of the order
 *           example: "Updated order details"
 *         quantity:
 *           type: integer
 *           description: The updated quantity of the product ordered
 *           example: 3
 *         total:
 *           type: number
 *           description: The updated total amount for the order
 *           example: 299.97
 *     OrderResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Order updated successfully
 *         order:
 *           $ref: '#/components/schemas/Order'
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the order
 *           example: "60b6c0d5f1b60c5f1d8e4a5c"
 *         product:
 *           type: string
 *           description: The ID of the product being ordered
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         category:
 *           type: string
 *           description: The ID of the category for the product
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         user:
 *           type: string
 *           description: The ID of the user who placed the order
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         paymentMethod:
 *           type: string
 *           description: The ID of the payment method used for the order
 *           example: "60c0d5e7ad21438c6f4c8234"
 *         status:
 *           type: string
 *           description: The status of the order
 *           example: "Completed"
 *         description:
 *           type: string
 *           description: The description of the order
 *           example: "Updated order details"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product ordered
 *           example: 3
 *         total:
 *           type: number
 *           description: The total amount for the order
 *           example: 299.97
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the order
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 *           example: "2024-05-17T10:00:00.000Z"
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error message describing the issue
 */

order.delete ("/deleteOrderById/:Id",deleteOrderById);
/**
 * @swagger
 * /api/order/deleteOrderById/{Id}:
 *   delete:
 *     summary: Delete an order by ID
 *     description: Delete an existing order by its ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Order deleted successfully
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error message describing the issue
 */




module.exports = order;