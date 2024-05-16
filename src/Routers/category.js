const express = require('express');
const category = express.Router();
const {CreateCategory,GetAllCategories,UpdateCategory,DeleteCategory} = require('../Controllers/Category')


category.post("/createCategory", CreateCategory);
category.get("/getAllCategories", GetAllCategories);
category.delete("/deleteCategory/:id", DeleteCategory);
category.patch("/updateCategory/:id", UpdateCategory);

module.exports = category;