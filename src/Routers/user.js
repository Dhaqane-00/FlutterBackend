const express = require("express");
const user = express.Router();

const {createUser,GetUser,getAllUsers,updateUser,deleteUser} = require('../Controllers/User')

user.post("/createUser", createUser);
user.post("/GetUser", GetUser);
user.get("/getAllUsers", getAllUsers);
user.patch("/UpdateUser/:id",updateUser);
user.delete("/DeleteUser/:id", deleteUser);



module.exports = user