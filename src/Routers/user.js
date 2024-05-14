const express = require("express");
const user = express.Router();

const {createUser,GetUser} = require('../Controllers/User')

user.post("/createUser", createUser);
user.post("/GetUser", GetUser);




module.exports = user