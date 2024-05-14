const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({user:user,email:email},process.env.JWT_SECRET, {expiresIn: process.env.JWT_SECRET_EXPIRATION})

        return res.status(201).json({
            message: "User created successfully",
            data: user,
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.GetUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const existingUser = await User.findOne({name});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }
        const existingEmail = await User.findOne({email});
        if(!existingEmail){
            return res.status(404).json({message:"Email not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const user = await User.findOne({email});


        const token = jwt.sign({email:email,password:password},process.env.JWT_SECRET, {expiresIn: process.env.JWT_SECRET_EXPIRATION})
        return res.status(200).json({
            message: "User authenticated successfully",
            data:user
        });

    }catch (error) {
        console.error(error);
    }
}
