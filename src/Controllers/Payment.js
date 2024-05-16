const { Payment } = require('../Model/models');
const jwt = require('jsonwebtoken');

exports.createPayment = async (req, res) => {
    try {
        // Extract payment details from the request body
        const { name, description, type } = req.body;

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

        // Create a new payment instance
        const payment = new Payment({
            name,
            description,
            type,
            createdBy: decodedToken.userId,
            createdAt: new Date()
        });

        // Save the payment to the database
        await payment.save();

        // Send a success response
        res.status(201).json({ success: true, message: 'Payment created successfully', Date:payment });
    } catch (error) {
        // Handle errors
        console.error('Error creating payment:', error);
        res.status(500).json({ success: false, message: 'Failed to create payment', error: error.message });
    }
};


exports.getAllPayments = async (req, res) => {
    try {
        // Fetch all payments from the database
        const payments = await Payment.find();

        // Send the payments as a response
        res.status(200).json({ success: true, Date: payments });
    } catch (error) {
        // Handle errors
        console.error('Error fetching payments:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch payments', error: error.message });
    }
};



exports.updatePayment = async (req, res) => {
    try {
        const paymentId = req.params.id; // Extract payment ID from request params
        const updateFields = req.body; // Extract fields to update from request body

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
            return res.status(403).json({ success: false, message: 'Only admin users can update payments' });
        }

        // Find the payment by ID and update its fields
        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateFields, { new: true });

        if (!updatedPayment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        // Send the updated payment as a response
        res.status(200).json({ success: true, message: 'Payment updated successfully', payment: updatedPayment });
    } catch (error) {
        // Handle errors
        console.error('Error updating payment:', error);
        res.status(500).json({ success: false, message: 'Failed to update payment', error: error.message });
    }
};


exports.deletePayment = async (req, res) => {
    try {
        const paymentId  = req.params.id; // Extract payment ID from request params

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


        // Find the payment by ID and delete it
        const deletedPayment = await Payment.findByIdAndDelete(paymentId);

        if (!deletedPayment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        // Send a success response
        res.status(200).json({ success: true, message: 'Payment deleted successfully' ,Date: deletedPayment });
    } catch (error) {
        // Handle errors
        console.error('Error deleting payment:', error);
        res.status(500).json({ success: false, message: 'Failed to delete payment', error: error.message });
    }
};
