const {Banner} = require('../Model/models');
const jwt = require('jsonwebtoken');

exports.createBanner = async (req, res) => {
    try {
        // Extract banner details from the request body
        const { name, description, image } = req.body;

        // Extract the token from the request headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains user information
        if (!decodedToken || !decodedToken.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }

        // Create a new banner instance
        const banner = new Banner({
            name,
            description,
            image,
            createdBy: decodedToken.userId,
            createdAt: new Date()
        });

        // Save the banner to the database
        await banner.save();

        // Send a success response
        res.status(201).json({ success: true, message: 'Banner created successfully', banner });
    } catch (error) {
        console.error('Error creating banner:', error);
        res.status(500).json({ success: false, message: 'Failed to create banner', error: error.message });
    }
};

exports.getAllBanners = async (req, res) => {
    try {
        // Fetch all banners from the database
        const banners = await Banner.find();

        // Send the banners as the response
        res.status(200).json({ success: true, message: 'Banners found', banners });
    } catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch banners', error: error.message });
    }
};


exports.updateBanner = async (req, res) => {
    try {
        const bannerId = req.params;
        const { name, description, image } = req.body;

        // Check if the banner exists
        const existingBanner = await Banner.findById(bannerId);
        if (!existingBanner) {
            return res.status(404).json({ success: false, message: 'Banner not found' });
        }

        // Update the banner with the provided data
        existingBanner.name = name;
        existingBanner.description = description;
        existingBanner.image = image;

        // Save the updated banner to the database
        await existingBanner.save();

        // Send a success response
        res.status(200).json({ success: true, message: 'Banner updated successfully', banner: existingBanner });
    } catch (error) {
        console.error('Error updating banner:', error);
        res.status(500).json({ success: false, message: 'Failed to update banner', error: error.message });
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const banner = req.params.id;

        // Check if the banner exists
        const existingBanner = await Banner.findById(banner);
        if (!existingBanner) {
            return res.status(404).json({ success: false, message: 'Banner not found' });
        }

        // Delete the banner from the database
        await Banner.findByIdAndDelete(banner);

        // Send a success response
        res.status(200).json({ success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(500).json({ success: false, message: 'Failed to delete banner', error: error.message });
    }
};

