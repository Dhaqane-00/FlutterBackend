const { Product, Category } = require('../Model/models');
const jwt = require('jsonwebtoken');

exports.CreateProduct = async (req, res) => {
    try {
        // Extract product details from the request body
        const { name, description, images, price, salePrice, salePriceDate, isTrending, units, categoryId } = req.body;

        // Extract the token from the request headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains user information and role
        if (!decodedToken || !decodedToken.userId || !decodedToken.role) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }

        // Check if the user is authorized to create products
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admin users can create products' });
        }
        const category = await Category.findById(categoryId);
        console.log(category)
        // Check if the product exists
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        // Create a new product instance
        const product = new Product({
            name,
            description,
            images,
            price,
            salePrice,
            salePriceDate,
            isTrending,
            isFavourite,
            rating,
            units,
            category: categoryId,
            createdBy: decodedToken.userId,
            createdAt: new Date()
        });

        // Save the product to the database
        await product.save();

        // Send response with created product details
        res.status(201).json({ success: true, message: 'Product created successfully', product });
    } catch (error) {
        // Handle errors
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Check if products array is empty
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        // Send the products as a response
        res.status(200).json({ success: true, Date: products });
    } catch (error) {
        // Handle errors
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateFields = req.body; 

        // Extract the token from the request headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains user information and role
        if (!decodedToken || !decodedToken.userId || !decodedToken.role) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }

        // Check if the user is an admin
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admin users can update products' });
        }

        // Find the product by ID and update its fields
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateFields, { new: true });
        

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Send the updated product as a response
        res.status(200).json({ success: true, message: 'Product updated successfully', Date: updatedProduct });
    } catch (error) {
        // Handle errors
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id; // Extract product ID from request params

        // Extract the token from the request headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains user information and role
        if (!decodedToken || !decodedToken.userId || !decodedToken.role) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }

        // Check if the user is an admin
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admin users can delete products' });
        }

        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Send a success response
        res.status(200).json({ success: true, message: 'Product deleted successfully', Date: deletedProduct });
    } catch (error) {
        // Handle errors
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
    }
};
