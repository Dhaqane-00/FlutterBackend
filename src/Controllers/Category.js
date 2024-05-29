const { Category } = require('../Model/models');
const jwt = require('jsonwebtoken');

exports.CreateCategory = async (req, res) => {
    try {
        // Extract category details from the request body
        const { name, description, } = req.body;
        const photo= req.file.path
        let correctedPath =process.env.IMAGE_URL + photo.replace(/\\/g, "/");

        // Extract the token from the request headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains user information
        if (!decodedToken || !decodedToken.userId || !decodedToken.role) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }

        // Check if the user is an admin
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only root user can create categories' });
        }
        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'Category already exists' });
        }

        // Create a new category instance
        const category = new Category({
            name,
            description,
            photo:correctedPath,
            createdBy: decodedToken.userId
        });

        // Save the category to the database
        await category.save();

        res.status(201).json({ success: true, message: 'Category created successfully', Date: category });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ success: false, message: 'Failed to create category', error: error.message });
    }
};
exports.GetAllCategories = async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ success: false, message: 'No categories found' });
        }

        res.status(200).json({ success: true, message: 'Categories retrieved successfully', categories });
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message });
    }
};

exports.UpdateCategory = async (req, res) => {
    try {
        // Extract category details from the request body
        const { name, description, photo } = req.body;

        // Extract category ID from the request parameters
        const categoryId = req.params.id;

        // Extract the token from the request headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains user information
        if (!decodedToken || !decodedToken.userId || !decodedToken.role) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }

        // Check if the user is an admin
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admin can update categories' });
        }

        // Check if categoryId is provided
        if (!categoryId) {
            return res.status(400).json({ success: false, message: 'categoryId is required' });
        }

        // Find the category by ID
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        // Update category fields
        category.name = name;
        category.description = description;
        category.photo = photo;

        // Save the updated category to the database
        await category.save();

        res.status(200).json({ success: true, message: 'Category updated successfully', category });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ success: false, message: 'Failed to update category', error: error.message });
    }
};


exports.DeleteCategory = async (req, res) => {
    try {
        // Extract category ID from the request parameters
        const categoryId = req.params.id;

        // Extract the token from the request headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains user information
        if (!decodedToken || !decodedToken.userId || !decodedToken.role) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }

        // Check if the user is an admin
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admin can delete categories' });
        }

        // Check if categoryId is provided
        if (!categoryId) {
            return res.status(400).json({ success: false, message: 'categoryId is required' });
        }

        // Find the category by ID
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        // Delete the category from the database
        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ success: true, message: 'Category deleted successfully', Date: category });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, message: 'Failed to delete category', error: error.message });
    }
};
