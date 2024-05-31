const express = require("express");
const upload = require("../utils/upload");
const user = express.Router();

const {createUser,OTPVerification,verifyOTP,GetUser,getAllUsers,ForgetPassword,resetPassword,updateUser,deleteUser} = require('../Controllers/User')


user.post("/createUser",upload.single("photo"), createUser);
/**
 * @swagger
 * /api/user/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: Dhaqane
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *                 example: Dhaqane@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: mypassword
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: The user's photo file
 *               role:
 *                 type: string
 *                 description: The role of the user
 *                 enum: [admin, user]
 *                 example: user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating success
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       description: JWT token for authentication
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzE0NzU1NzQzNTg3MTI5MDAwMDAiLCJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MjA3NDEyNjcsImV4cCI6MTYyMTg2MzI2N30.1K0XXQZQ2b1qg4_d8tOoRB-4g5tsPXnRi9bDje4A2-E
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the error
 *                   example: User already exists
 *       500:
 *         description: Internal server error
 */

user.post("/verifyOTP",verifyOTP);

user.post("/GetUser", GetUser);
/**
 * @swagger
 * /api/user/getUser:
 *   post:
 *     summary: Get user details
 *     description: Authenticate and retrieve user details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *                 example: "Dhaqane@gmail.com"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "mypassword"
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating success
 *                   example: "User authenticated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       description: JWT token for authentication
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the error
 *                   example: "Invalid password"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the error
 *                   example: "Email not found"
 *       500:
 *         description: Internal server error
 */

user.get("/getAllUsers", getAllUsers);
/**
 * @swagger
 * /api/user/getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       500:
 *         description: Internal server error
 */
user.post("/forgotPassword",ForgetPassword);

user.post("/resetPassword",resetPassword);

user.patch("/UpdateUser/:id",updateUser);
/**
 * @swagger
 * /api/user/UpdateUser/{id}:
 *   patch:
 *     summary: Update user details
 *     description: Update details of a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating success
 *                   example: User updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the error
 *                   example: Invalid request body
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the error
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     UserUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The updated name of the user (optional)
 *         email:
 *           type: string
 *           format: email
 *           description: The updated email address of the user (optional)
 *         password:
 *           type: string
 *           description: The updated password of the user (optional)
 *         photo:
 *           type: string
 *           description: The updated URL of the user's photo (optional)
 */

user.delete("/DeleteUser/:id", deleteUser);

/**
 * @swagger
 * /api/user/DeleteUser/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a specific user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */




module.exports = user