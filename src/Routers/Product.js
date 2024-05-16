const express = require('express');
const Product = express.Router();
const {CreateProduct,getAllProducts,updateProduct,deleteProduct} = require('../Controllers/Product')

Product.post ("/createProduct", CreateProduct);
Product.get ("/getAllProducts", getAllProducts);
Product.put ("/updateProduct/:id", updateProduct);
Product.delete ("/deleteProduct/:id", deleteProduct);

module.exports = Product;