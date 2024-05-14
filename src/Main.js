const user = require("./Routers/user")
const express = require("express");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user",user);



module.exports = app