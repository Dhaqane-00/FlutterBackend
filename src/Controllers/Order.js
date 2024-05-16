const { Order, Product ,Payment, Category } = require('../Model/models');
const jwt = require('jsonwebtoken');

exports.createOrder = async (req, res) => {
    try {
        // Extract order details from the request body
        const { productId, categoryId, paymentMethodId, status, description, quantity, total } = req.body;

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

        // Fetch the product details based on the productId
        const product = await Product.findById(productId);
        console.log(product);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        const category = await Category.findById(categoryId);
        // Check if the product exists
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        const payment = await Payment.findById(paymentMethodId);

        // Check if the product exists
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        // Create a new order instance
        const order = new Order({
            product: product._id,
            category: categoryId,
            user: decodedToken.userId,
            paymentMethod: paymentMethodId,
            status,
            description,
            quantity,
            total,
            createdBy: decodedToken.userId,
            createdAt: new Date()
        });

        // Save the order to the database
        await order.save();

        // Send a success response
        res.status(201).json({ success: true, message: 'Order created successfully', order });
    } catch (error) {
        // Handle errors
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.Id;

        // Fetch the order from the database
        const order = await Order.findById(orderId);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Send the order as the response
        res.status(200).json({ success: true, message: 'Order found', order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch order', error: error.message });
    }
};
exports.updateOrder = async (req, res) => {
    try {

        const { orderId, productId, categoryId, paymentMethodId, status, description, quantity, total } = req.body;

        // Fetch the order from the database
        const existingOrder = await Order.findById(orderId);

        // Check if the order exists
        if (!existingOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Fetch the product details based on the productId
        const product = await Product.findById(productId);
        

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        const category = await Category.findById(categoryId);
        // Check if the category exists
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        
        const payment = await Payment.findById(paymentMethodId);
        // Check if the payment method exists
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment method not found' });
        }

        // Update the order with the provided data
        existingOrder.product = product._id;
        existingOrder.category = categoryId;
        existingOrder.paymentMethod = paymentMethodId;
        existingOrder.status = status;
        existingOrder.description = description;
        existingOrder.quantity = quantity;
        existingOrder.total = total;

        // Save the updated order to the database
        await existingOrder.save();

        // Send a success response
        res.status(200).json({ success: true, message: 'Order updated successfully', order: existingOrder });
    } catch (error) {
        // Handle errors
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, message: 'Failed to update order', error: error.message });
    }
};



exports.getAllOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();

        // Send the orders as the response
        res.status(200).json({ success: true, message: 'Orders found', orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
    }
};


exports.deleteOrderById = async (req, res) => {
    try {
        const orderId = req.params.Id;

        // Check if the order exists
        const existingOrder = await Order.findById(orderId);
        if (!existingOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Delete the order from the database
        await Order.findByIdAndDelete(orderId);

        // Send a success response
        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: 'Failed to delete order', error: error.message });
    }
};

