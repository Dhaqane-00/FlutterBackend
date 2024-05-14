const mongoose = require('mongoose');
const {generateNextId} = require("../utils/Helper");
const Schema = mongoose.Schema;

// Define User schema
const userSchema = new Schema({
    _id: { type: String, default: () => { return generateNextId(); }},
    name: String,
    email: { type: String, unique: true },
    password: String,
    photo: String,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

// Define Category schema
const categorySchema = new Schema({
    name: String,
    description: String,
    photo: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});

// Define Product schema
const productSchema = new Schema({
    name: String,
    description: String,
    images: [String], // Array of image URLs
    price: Number,
    salePrice: Number,
    salePriceDate: Date,
    isTrending: Boolean,
    units: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category model
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});

// Define Payment schema
const paymentSchema = new Schema({
    name: String,
    description: String,
    type: String, // e.g., Credit Card, PayPal, etc.
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});

// Define Order schema
const orderSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product model
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category model
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    paymentMethod: { type: Schema.Types.ObjectId, ref: 'Payment' }, // Reference to Payment model
    status: String,
    description: String,
    quantity: Number,
    total: Number,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});

// Define Banner schema
const bannerSchema = new Schema({
    name: String,
    description: String,
    image: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});

// Define Review schema
const reviewSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product model
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    rating: Number,
    comment: String,
    datePosted: { type: Date, default: Date.now }
});

// Define ShoppingCart schema
const shoppingCartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    product: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product model
    quantity: Number,
    createdAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Order = mongoose.model('Order', orderSchema);
const Banner = mongoose.model('Banner', bannerSchema);
const Review = mongoose.model('Review', reviewSchema);
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);





module.exports = {
    User,
    Category,
    Product,
    Payment,
    Order,
    Banner,
    Review,
    ShoppingCart
};
