require("dotenv").config();
const app = require("./src/Main");
const mongoose = require("mongoose");
const morgan = require("morgan");


const connection = process.env.CONNECTION_STRING
const port = process.env.PORT || 500;

if (process.env.ENVIRONMENT === "development") {
  app.use(morgan("dev"));
  mongoose.set("debug", true);
}

mongoose.connect(connection, {}).then(()=>{
    console.log("🤝 Connection successfully")
}).catch((Error)=>{
    console.log(Error)
    return
})

app.listen(port, () => {
  console.log(`🏃‍♂️Server is running on port ${port}`);
})