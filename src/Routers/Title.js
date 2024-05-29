const express = require('express');
const Title = express.Router();
const { createTitle, getAllTitles, updateTitle, deleteTitle } = require('../Controllers/Title');

Title.post("/createTitle", createTitle);
/**
 * @swagger
 * /api/title/createTitle:
 *   post:
 *     summary: Create a new title
 *     description: Create a new title with a title and subtitle
 *     tags: [Title]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The main title text
 *                 example: "Example Title"
 *               subtitle:
 *                 type: string
 *                 description: The subtitle text
 *                 example: "Example Subtitle"
 *     responses:
 *       201:
 *         description: Title created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TitleResponse'
 *       400:
 *         description: Bad request
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
 */

Title.get("/getAllTitles", getAllTitles);
/**
 * @swagger
 * /api/title/getAllTitles:
 *   get:
 *     summary: Retrieve all titles
 *     description: Get a list of all titles
 *     tags: [Title]
 *     responses:
 *       200:
 *         description: A list of titles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TitleResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

Title.put("/updateTitle/:id", updateTitle);
/**
 * @swagger
 * /api/title/updateTitle/{id}:
 *   put:
 *     summary: Update a title
 *     description: Update an existing title by its ID
 *     tags: [Title]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the title to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The main title text
 *                 example: "Updated Title"
 *               subtitle:
 *                 type: string
 *                 description: The subtitle text
 *                 example: "Updated Subtitle"
 *     responses:
 *       200:
 *         description: Title updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TitleResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Title not found
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
 */

Title.delete("/deleteTitle/:id", deleteTitle);
/**
 * @swagger
 * /api/title/deleteTitle/{id}:
 *   delete:
 *     summary: Delete a title
 *     description: Delete an existing title by its ID
 *     tags: [Title]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the title to delete
 *     responses:
 *       200:
 *         description: Title deleted successfully
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
 *       404:
 *         description: Title not found
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
 */

module.exports = Title;

/**
 * @swagger
 * components:
 *   schemas:
 *     TitleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Title created successfully
 *         title:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Example Title"
 *             subtitle:
 *               type: string
 *               example: "Example Subtitle"
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Banner deleted successfully
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
