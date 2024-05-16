const express = require('express');
const ShoppingCart = express.Router();
const {createShoppingCart,updateShoppingCart,getAllShoppingCart,deleteShoppingCartItemById} = require('../Controllers/ShoppingCart')

ShoppingCart.post("/createShoping",createShoppingCart);
ShoppingCart.get("getAllShoppingCart",getAllShoppingCart);
ShoppingCart.patch("/updateShoppingCart/:id",updateShoppingCart);
ShoppingCart.delete("/updateShoppingCart/:id",deleteShoppingCartItemById);



module.exports = ShoppingCart;