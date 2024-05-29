const express = require('express');
const upload = require("../utils/upload");
const Banner = express.Router();
const {createBanner,getAllBanners,updateBanner,deleteBanner} = require('../Controllers/Banner')

Banner.post("/CreateBanner",upload.single("images"), createBanner);
/**
 * @swagger
 * /api/banner/createBanner:
 *   post:
 *     summary: Create a new banner
 *     description: Create a new banner with the provided details
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the banner
 *                 example: "Summer Sale"
 *               description:
 *                 type: string
 *                 description: Description of the banner
 *                 example: "Big discounts on summer items"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Banner image file
 *     responses:
 *       201:
 *         description: Banner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerResponse'
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
 *     BannerInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the banner
 *           example: "Summer Sale"
 *         description:
 *           type: string
 *           description: Description of the banner
 *           example: "Big discounts on summer items"
 *         image:
 *           type: string
 *           format: binary
 *           description: Banner image file
 *     BannerResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Banner created successfully
 *         banner:
 *           $ref: '#/components/schemas/Banner'
 *     Banner:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the banner
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         name:
 *           type: string
 *           description: Name of the banner
 *           example: "Summer Sale"
 *         description:
 *           type: string
 *           description: Description of the banner
 *           example: "Big discounts on summer items"
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the banner image
 *           example: "https://example.com/banner.jpg"
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the banner
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the banner was created
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

Banner.get("/getAllBanners", getAllBanners);
/**
 * @swagger
 * /api/banner/getAllBanners:
 *   get:
 *     summary: Get all banners
 *     description: Retrieve a list of all banners
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: List of all banners
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerListResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     BannerListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         banners:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Banner'
 *     Banner:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the banner
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         name:
 *           type: string
 *           description: Name of the banner
 *           example: "Summer Sale"
 *         description:
 *           type: string
 *           description: Description of the banner
 *           example: "Big discounts on summer items"
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the banner image
 *           example: "https://example.com/banner.jpg"
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the banner
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the banner was created
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

Banner.patch("/updateBanner/:id", updateBanner);
/**
 * @swagger
 * /api/banner/updateBanner/{id}:
 *   patch:
 *     summary: Update a banner
 *     description: Update the details of an existing banner
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the banner to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BannerUpdateInput'
 *     responses:
 *       200:
 *         description: Banner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerResponse'
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
 *         description: Banner not found
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
 *     BannerUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the banner
 *           example: "Summer Sale"
 *         description:
 *           type: string
 *           description: Description of the banner
 *           example: "Big discounts on summer items"
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the banner image
 *           example: "https://example.com/banner.jpg"
 *     BannerResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Banner updated successfully
 *         banner:
 *           $ref: '#/components/schemas/Banner'
 *     Banner:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the banner
 *           example: "60b6c0d5f1b60c5f1d8e4a5b"
 *         name:
 *           type: string
 *           description: Name of the banner
 *           example: "Summer Sale"
 *         description:
 *           type: string
 *           description: Description of the banner
 *           example: "Big discounts on summer items"
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the banner image
 *           example: "https://example.com/banner.jpg"
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the banner
 *           example: "60a7c0d5f1b60c5f1d8e4a4b"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the banner was created
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

Banner.delete("/deleteBanner/:id", deleteBanner);
/**
 * @swagger
 * /api/banner/deleteBanner/{id}:
 *   delete:
 *     summary: Delete a banner
 *     description: Delete an existing banner by its ID
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the banner to delete
 *     responses:
 *       200:
 *         description: Banner deleted successfully
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
 *         description: Banner not found
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


module.exports = Banner;