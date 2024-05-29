const express = require('express');
const upload = require("../utils/upload");
const category = express.Router();
const {CreateCategory,GetAllCategories,UpdateCategory,DeleteCategory} = require('../Controllers/Category')


category.post("/createCategory",upload.single("photo"), CreateCategory);
/**
 * @swagger
 * /api/category/createCategory:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category with a name, description, and photo
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 description: The description of the category
 *                 example: "A category for electronic devices"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: The photo file of the category (optional)
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Category already exists
 *       401:
 *         description: Bad request
 *       402:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - Only admin users can create categories
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     CategoryInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category
 *           example: "Electronics"
 *         description:
 *           type: string
 *           description: The description of the category
 *           example: "A category for electronic devices"
 *         photo:
 *           type: string
 *           description: The URL of the category photo (optional)
 *           example: "https://example.com/category.jpg"
 *
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Category created successfully
 *         data:
 *           $ref: '#/components/schemas/Category'
 *
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: The description of the category
 *         photo:
 *           type: string
 *           description: The URL of the category photo
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the category was created
 */


category.get("/getAllCategories", GetAllCategories);
/**
 * @swagger
 * /api/category/getAllCategories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 */

category.patch("/updateCategory/:id", UpdateCategory);
/**
 * @swagger
 * /api/category/updateCategory/{id}:
 *   patch:
 *     summary: Update a category
 *     description: Update a specific category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryUpdateInput'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - Only admin users can update categories
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     CategoryUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The updated name of the category (optional)
 *         description:
 *           type: string
 *           description: The updated description of the category (optional)
 *         photo:
 *           type: string
 *           description: The updated URL of the category photo (optional)
 *
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Category updated successfully
 *         data:
 *           $ref: '#/components/schemas/Category'
 *
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: The description of the category
 *         photo:
 *           type: string
 *           description: The URL of the category photo
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the category
 */

category.delete("/deleteCategory/:id", DeleteCategory);
/**
 * @swagger
 * /api/category/deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete a specific category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - Only admin users can delete categories
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */


module.exports = category;