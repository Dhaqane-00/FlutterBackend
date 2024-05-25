const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User schema
const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    photo: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    verify: { type: Boolean, default: false },
    otp: String,
    otpExpires: Date
});
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *           unique: true
 *         password:
 *           type: string
 *           description: Password for the user
 *         photo:
 *           type: string
 *           description: URL of the user's photo
 *           default: "default_photo_url_here"
 *         role:
 *           type: string
 *           description: Role of the user
 *           enum: ["admin", "user"]
 *           default: "user"
 */

const userOTP = new Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User' }, 
    otp: String, 
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: Date.now }
})
// Define Category schema
const categorySchema = new Schema({
    name: String,
    description: String,
    photo: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the category
 *         name:
 *           type: string
 *           description: Name of the category
 *         description:
 *           type: string
 *           description: Description of the category
 *         photo:
 *           type: string
 *           description: URL of the category's photo
 *         createdBy:
 *           type: string
 *           description: Reference to the user who created the category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the category was created
 */


// Define Product schema
const productSchema = new Schema({
    name: String,
    description: String,
    images: [String], // Array of image URLs
    price: Number,
    salePrice: Number,
    salePriceDate: Date,
    isTrending: Boolean,
    isFavourite: Boolean,
    rating: Number,
    units: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category model
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         description:
 *           type: string
 *           description: Description of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs for the product
 *         price:
 *           type: number
 *           description: Price of the product
 *         salePrice:
 *           type: number
 *           description: Sale price of the product
 *         salePriceDate:
 *           type: string
 *           format: date-time
 *           description: Date when the sale price is applicable
 *         isTrending:
 *           type: boolean
 *           description: Indicates if the product is trending
 *         units:
 *           type: number
 *           description: Number of units available
 *         category:
 *           type: string
 *           description: Reference to the category of the product
 *         createdBy:
 *           type: string
 *           description: Reference to the user who created the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the product was created
 */

// Define Payment schema
const paymentSchema = new Schema({
    name: String,
    description: String,
    type: String, // e.g., Credit Card, PayPal, etc.
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the payment
 *         name:
 *           type: string
 *           description: Name of the payment method
 *         description:
 *           type: string
 *           description: Description of the payment method
 *         type:
 *           type: string
 *           description: Type of payment method (e.g., Credit Card, PayPal)
 *         createdBy:
 *           type: string
 *           description: Reference to the user who created the payment method
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the payment method was created
 */

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
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the order
 *         product:
 *           type: string
 *           description: Reference to the product in the order
 *         category:
 *           type: string
 *           description: Reference to the category of the product in the order
 *         user:
 *           type: string
 *           description: Reference to the user who placed the order
 *         paymentMethod:
 *           type: string
 *           description: Reference to the payment method used for the order
 *         status:
 *           type: string
 *           description: Status of the order
 *         description:
 *           type: string
 *           description: Description of the order
 *         quantity:
 *           type: number
 *           description: Quantity of the product ordered
 *         total:
 *           type: number
 *           description: Total price of the order
 *         createdBy:
 *           type: string
 *           description: Reference to the user who created the order
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the order was created
 */

// Define Banner schema
const bannerSchema = new Schema({
    name: String,
    description: String,
    image: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdAt: { type: Date, default: Date.now }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the banner
 *         name:
 *           type: string
 *           description: Name of the banner
 *         description:
 *           type: string
 *           description: Description of the banner
 *         image:
 *           type: string
 *           description: URL of the banner image
 *         createdBy:
 *           type: string
 *           description: Reference to the user who created the banner
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the banner was created
 */

// Define ShoppingCart schema
const shoppingCartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    product: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product model
    quantity: Number,
    createdAt: { type: Date, default: Date.now }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingCart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the shopping cart item
 *         user:
 *           type: string
 *           description: Reference to the user who owns the shopping cart
 *         product:
 *           type: string
 *           description: Reference to the product in the shopping cart
 *         quantity:
 *           type: number
 *           description: Quantity of the product in the shopping cart
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the shopping cart item was created
 */
// Create models
const User = mongoose.model('User', userSchema);
const UserOTP = mongoose.model('UserOTP', userOTP);
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Order = mongoose.model('Order', orderSchema);
const Banner = mongoose.model('Banner', bannerSchema);
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);





module.exports = {
    User,
    UserOTP,
    Category,
    Product,
    Payment,
    Order,
    Banner,
    ShoppingCart
};
