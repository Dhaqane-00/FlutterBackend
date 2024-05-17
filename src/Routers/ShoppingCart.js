const express = require('express');
const ShoppingCart = express.Router();
const {createShopping,updateShopping,getAllShopping,deleteShopping} = require('../Controllers/ShoppingCart')

ShoppingCart.post("/createShoping",createShopping);
/**
 * @swagger
 * /api/shoping/createShoping:
 *   post:
 *     summary: Create a new shopping cart
 *     description: Create a new shopping cart with the provided details
 *     tags: [ShoppingCart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingCartInput'
 *     responses:
 *       201:
 *         description: Shopping cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCartResponse'
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
 *         description: Product not found
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
 *     ShoppingCartInput:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product to add to the shopping cart
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product to add to the shopping cart
 *           example: 2
 *     ShoppingCartResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Shopping cart created successfully
 *         shoppingCart:
 *           $ref: '#/components/schemas/ShoppingCart'
 *     ShoppingCart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the shopping cart
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         user:
 *           type: string
 *           description: The ID of the user who owns the shopping cart
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         product:
 *           type: string
 *           description: The ID of the product added to the shopping cart
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the shopping cart
 *           example: 2
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the shopping cart was created
 *           example: "2024-05-31T12:00:00.000Z"
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

ShoppingCart.get("/getAllShopping",getAllShopping);
/**
 * @swagger
 * /api/shoping/getAllShopping:
 *   get:
 *     summary: Get all shopping carts
 *     description: Retrieve a list of all shopping carts
 *     tags: [ShoppingCart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all shopping carts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCartListResponse'
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
 *     ShoppingCartListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         shoppingCarts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ShoppingCart'
 *     ShoppingCart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the shopping cart
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         user:
 *           type: string
 *           description: The ID of the user who owns the shopping cart
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         product:
 *           type: string
 *           description: The ID of the product added to the shopping cart
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the shopping cart
 *           example: 2
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the shopping cart was created
 *           example: "2024-05-31T12:00:00.000Z"
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

ShoppingCart.patch("/updateShopping/:id",updateShopping);
/**
 * @swagger
 * /api/shoping/updateShopping/{id}:
 *   patch:
 *     summary: Update a shopping cart
 *     description: Update the details of an existing shopping cart
 *     tags: [ShoppingCart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shopping cart to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingCartUpdateInput'
 *     responses:
 *       200:
 *         description: Shopping cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCartResponse'
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
 *         description: Shopping cart not found
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
 *     ShoppingCartUpdateInput:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *           description: The new quantity of the product in the shopping cart
 *           example: 3
 *     ShoppingCartResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Shopping cart updated successfully
 *         shoppingCart:
 *           $ref: '#/components/schemas/ShoppingCart'
 *     ShoppingCart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the shopping cart
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         user:
 *           type: string
 *           description: The ID of the user who owns the shopping cart
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         product:
 *           type: string
 *           description: The ID of the product added to the shopping cart
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the shopping cart
 *           example: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the shopping cart was created
 *           example: "2024-05-31T12:00:00.000Z"
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

ShoppingCart.delete("/DeleteShopping/:id",deleteShopping);
/**
 * @swagger
 * /api/shoping/DeleteShopping/{id}:
 *   delete:
 *     summary: Delete a shopping cart item by ID
 *     description: Delete an existing shopping cart item by its ID
 *     tags: [ShoppingCart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shopping cart item to delete
 *     responses:
 *       200:
 *         description: Shopping cart item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
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
 *         description: Shopping cart item not found
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
 *           example: Shopping cart item deleted successfully
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



module.exports = ShoppingCart;