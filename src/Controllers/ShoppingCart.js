const { ShoppingCart,Product } = require('../Model/models');
const jwt = require('jsonwebtoken');

exports.createShoppingCart = async (req, res) => {
    try {
        // Extract shopping cart details from the request body
        const { productId, quantity } = req.body;

        // Extract the token from the request headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains user information
        if (!decodedToken || !decodedToken.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });

        }
        
        const product = await Product.findById(productId);
        console.log(product);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Create a new shopping cart instance
        const shoppingCart = new ShoppingCart({
            user: decodedToken.userId,
            product: product._id,
            quantity,
            createdAt: new Date()
        });

        // Save the shopping cart to the database
        await shoppingCart.save();

        // Send a success response
        res.status(201).json({ success: true, message: 'Shopping cart created successfully', shoppingCart });
    } catch (error) {
        console.error('Error creating shopping cart:', error);
        res.status(500).json({ success: false, message: 'Failed to create shopping cart', error: error.message });
    }
};

exports.updateShoppingCart = async (req, res) => {
    try {
        const shoppingCartItemId = req.params.Id;
        const { quantity } = req.body;

        // Check if the shopping cart item exists
        const shoppingCartItem = await ShoppingCart.findById(shoppingCartItemId);
        if (!shoppingCartItem) {
            return res.status(404).json({ success: false, message: 'Shopping cart item not found' });
        }

        // Update the quantity of the shopping cart item
        shoppingCartItem.quantity = quantity;

        // Save the updated shopping cart item to the database
        await shoppingCartItem.save();

        // Send a success response
        res.status(200).json({ success: true, message: 'Shopping cart item updated successfully', shoppingCartItem });
    } catch (error) {
        console.error('Error updating shopping cart item:', error);
        res.status(500).json({ success: false, message: 'Failed to update shopping cart item', error: error.message });
    }
};

exports.getAllShoppingCart = async (req, res) => {
    try {
        // Fetch all shopping cart items from the database
        const shoppingCartItems = await ShoppingCart.find();

        // Send the shopping cart items as the response
        res.status(200).json({ success: true, message: 'Shopping cart items found', shoppingCartItems });
    } catch (error) {
        console.error('Error fetching shopping cart items:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch shopping cart items', error: error.message });
    }
};


exports.deleteShoppingCartItemById = async (req, res) => {
    try {
        const shoppingCartItemId = req.params.Id;

        // Check if the shopping cart item exists
        const existingShoppingCartItem = await ShoppingCart.findById(shoppingCartItemId);
        if (!existingShoppingCartItem) {
            return res.status(404).json({ success: false, message: 'Shopping cart item not found' });
        }

        // Delete the shopping cart item from the database
        await ShoppingCart.findByIdAndDelete(shoppingCartItemId);

        // Send a success response
        res.status(200).json({ success: true, message: 'Shopping cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting shopping cart item:', error);
        res.status(500).json({ success: false, message: 'Failed to delete shopping cart item', error: error.message });
    }
};