const { Title } = require('../Model/models');
const jwt = require('jsonwebtoken');

exports.createTitle = async (req, res) => {
    try {
        // Extract title details from the request body
        const { title, subtitle } = req.body;

        // Create a new title instance
        const newTitle = new Title({
            title:title,
            subtitile:subtitle
        });

        // Save the title to the database
        await newTitle.save();

        // Send a success response
        res.status(201).json({ success: true, message: 'Title created successfully', newTitle });
    } catch (error) {
        console.error('Error creating title:', error);
        res.status(500).json({ success: false, message: 'Failed to create title', error: error.message });
    }
};

exports.getAllTitles = async (req, res) => {
    try {
        // Fetch all titles from the database
        const titles = await Title.find();

        // Send the titles as the response
        res.status(200).json({ success: true, message: 'Titles found', titles });
    } catch (error) {
        console.error('Error fetching titles:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch titles', error: error.message });
    }
};

exports.updateTitle = async (req, res) => {
    try {
        const titleId = req.params.id;
        const { title, subtitle } = req.body;

        // Check if the title exists
        const existingTitle = await Title.findById(titleId);
        if (!existingTitle) {
            return res.status(404).json({ success: false, message: 'Title not found' });
        }

        // Update the title with the provided data
        existingTitle.title = title;
        existingTitle.subtitile = subtitle;

        // Save the updated title to the database
        await existingTitle.save();

        // Send a success response
        res.status(200).json({ success: true, message: 'Title updated successfully', title: existingTitle });
    } catch (error) {
        console.error('Error updating title:', error);
        res.status(500).json({ success: false, message: 'Failed to update title', error: error.message });
    }
};

exports.deleteTitle = async (req, res) => {
    try {
        const titleId = req.params.id;

        // Check if the title exists
        const existingTitle = await Title.findById(titleId);
        if (!existingTitle) {
            return res.status(404).json({ success: false, message: 'Title not found' });
        }

        // Delete the title from the database
        await Title.findByIdAndDelete(titleId);

        // Send a success response
        res.status(200).json({ success: true, message: 'Title deleted successfully' });
    } catch (error) {
        console.error('Error deleting title:', error);
        res.status(500).json({ success: false, message: 'Failed to delete title', error: error.message });
    }
};
