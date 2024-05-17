const express = require('express');
const Product = express.Router();
const {CreateProduct,getAllProducts,updateProduct,deleteProduct} = require('../Controllers/Product')

Product.post ("/createProduct", CreateProduct);
/**
 * @swagger
 * /api/product/createProduct:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided details
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Category not found
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
 *     ProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: "Product Name"
 *         description:
 *           type: string
 *           description: The description of the product
 *           example: "Product Description"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image URLs for the product
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 99.99
 *         salePrice:
 *           type: number
 *           description: The sale price of the product (optional)
 *           example: 79.99
 *         salePriceDate:
 *           type: string
 *           format: date
 *           description: The end date of the sale price (optional)
 *           example: "2024-06-30"
 *         isTrending:
 *           type: boolean
 *           description: Indicates whether the product is trending (optional)
 *           example: true
 *         units:
 *           type: integer
 *           description: The number of units available for the product
 *           example: 100
 *         categoryId:
 *           type: string
 *           description: The ID of the category to which the product belongs
 *           example: "category123"
 *
 *     ProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Product created successfully
 *         product:
 *           $ref: '#/components/schemas/Product'
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the product
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: "Product Name"
 *         description:
 *           type: string
 *           description: The description of the product
 *           example: "Product Description"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image URLs for the product
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 99.99
 *         salePrice:
 *           type: number
 *           description: The sale price of the product (optional)
 *           example: 79.99
 *         salePriceDate:
 *           type: string
 *           format: date
 *           description: The end date of the sale price (optional)
 *           example: "2024-06-30"
 *         isTrending:
 *           type: boolean
 *           description: Indicates whether the product is trending (optional)
 *           example: true
 *         units:
 *           type: integer
 *           description: The number of units available for the product
 *           example: 100
 *         category:
 *           type: string
 *           description: The ID of the category to which the product belongs
 *           example: "category123"
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the product
 *           example: "user123"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was created
 *           example: "2024-05-31T12:00:00.000Z"
 *
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

Product.get ("/getAllProducts", getAllProducts);
/**
 * @swagger
 * /api/product/getAllProducts:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

Product.put ("/updateProduct/:id", updateProduct);
/**
 * @swagger
 * /api/product/updateProduct/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update details of a specific product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdateInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request
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
 *     ProductUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The updated name of the product (optional)
 *           example: "Updated Product Name"
 *         description:
 *           type: string
 *           description: The updated description of the product (optional)
 *           example: "Updated Product Description"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of updated image URLs for the product (optional)
 *           example: ["https://example.com/updated_image1.jpg", "https://example.com/updated_image2.jpg"]
 *         price:
 *           type: number
 *           description: The updated price of the product (optional)
 *           example: 109.99
 *         salePrice:
 *           type: number
 *           description: The updated sale price of the product (optional)
 *           example: 89.99
 *         salePriceDate:
 *           type: string
 *           format: date
 *           description: The updated end date of the sale price (optional)
 *           example: "2024-07-15"
 *         isTrending:
 *           type: boolean
 *           description: Indicates whether the product is trending (optional)
 *           example: false
 *         units:
 *           type: integer
 *           description: The updated number of units available for the product (optional)
 *           example: 50
 *
 *     ProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Product updated successfully
 *         product:
 *           $ref: '#/components/schemas/Product'
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the product
 *           example: "60a0e5c5e7ad21438c6f4c82"
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: "Product Name"
 *         description:
 *           type: string
 *           description: The description of the product
 *           example: "Product Description"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image URLs for the product
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 99.99
 *         salePrice:
 *           type: number
 *           description: The sale price of the product
 *           example: 79.99
 *         salePriceDate:
 *           type: string
 *           format: date
 *           description: The end date of the sale price
 *           example: "2024-06-30"
 *         isTrending:
 *           type: boolean
 *           description: Indicates whether the product is trending
 *           example: true
 *         units:
 *           type: integer
 *           description: The number of units available for the product
 *           example: 100
 *
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

Product.delete ("/deleteProduct/:id", deleteProduct);
/**
 * @swagger
 * /api/product/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a specific product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteProductResponse'
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
 *     DeleteProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Product deleted successfully
 *
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

module.exports = Product;