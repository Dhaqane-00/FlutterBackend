const express = require('express');
const Payment = express.Router();
const {createPayment,getAllPayments,updatePayment,deletePayment} = require('../Controllers/Payment')

Payment.post ("/createPayment", createPayment);
/**
 * @swagger
 * /api/payment/createPayment:
 *   post:
 *     summary: Create a new payment
 *     description: Create a new payment with the provided details
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     PaymentInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the payment
 *           example: "Monthly Subscription"
 *         description:
 *           type: string
 *           description: Description of the payment
 *           example: "Subscription for the month of May"
 *         type:
 *           type: string
 *           description: Type of the payment
 *           example: "Credit Card"
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Payment created successfully
 *         Date:
 *           $ref: '#/components/schemas/Payment'
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the payment
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         name:
 *           type: string
 *           description: Name of the payment
 *           example: "Monthly Subscription"
 *         description:
 *           type: string
 *           description: Description of the payment
 *           example: "Subscription for the month of May"
 *         type:
 *           type: string
 *           description: Type of the payment
 *           example: "Credit Card"
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the payment
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the payment was created
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

Payment.get ("/getAllPayments", getAllPayments);
/**
 * @swagger
 * /api/payment/getAllPayments:
 *   get:
 *     summary: Get all payments
 *     description: Retrieve a list of all payments
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentListResponse'
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
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the payment
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         name:
 *           type: string
 *           description: Name of the payment
 *           example: "Monthly Subscription"
 *         description:
 *           type: string
 *           description: Description of the payment
 *           example: "Subscription for the month of May"
 *         type:
 *           type: string
 *           description: Type of the payment
 *           example: "Credit Card"
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the payment
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the payment was created
 *           example: "2024-05-17T10:00:00.000Z"
 *     PaymentListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         payments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Payment'
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

Payment.patch ("/updatePayment/:id", updatePayment);
/**
 * @swagger
 * /api/payment/updatePayment/{id}:
 *   patch:
 *     summary: Update a payment
 *     description: Update the details of an existing payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentUpdateInput'
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
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
 *         description: Payment not found
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
 *     PaymentUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the payment
 *           example: "Monthly Subscription"
 *         description:
 *           type: string
 *           description: Description of the payment
 *           example: "Subscription for the month of June"
 *         type:
 *           type: string
 *           description: Type of the payment
 *           example: "Debit Card"
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Payment updated successfully
 *         Date:
 *           $ref: '#/components/schemas/Payment'
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the payment
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         name:
 *           type: string
 *           description: Name of the payment
 *           example: "Monthly Subscription"
 *         description:
 *           type: string
 *           description: Description of the payment
 *           example: "Subscription for the month of May"
 *         type:
 *           type: string
 *           description: Type of the payment
 *           example: "Credit Card"
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the payment
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the payment was created
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

Payment.delete ("/deletePayment/:id", deletePayment);
/**
 * @swagger
 * /api/payment/deletePayment/{id}:
 *   delete:
 *     summary: Delete a payment
 *     description: Delete an existing payment by its ID
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to delete
 *     responses:
 *       200:
 *         description: Payment deleted successfully
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
 *         description: Payment not found
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
 *           example: Payment deleted successfully
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

module.exports = Payment