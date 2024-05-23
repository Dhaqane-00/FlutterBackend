const {User} = require("../Model/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const photo = req.file ? req.file.filename : null;

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
            password: hashedPassword,
            photo,
            role,
            verify: false
        });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, name, email, role }, process.env.JWT_SECRET, { expiresIn: '1D' });

        return res.status(201).json({
            message: "user created successfully",
            data: {
                ...user._doc,
                token
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.GetUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "Email not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Assuming `existingUser` contains the role information
        const { role } = existingUser;

        // Generate JWT token
        const token = jwt.sign(
            { userId: existingUser._id, email: email, role: role }, // Include role here
            process.env.JWT_SECRET,
            { expiresIn: '1D' }
        );

        return res.status(200).json({
            message: "user Login successfully",
            data: {
                ...existingUser._doc,
                token
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};



exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Check if there are no users
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        // Return the users
        return res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.updateUser = async (req, res) => {
    const { name, email, password, photo } = req.body; // Destructure name, email, password, and photo directly from req.body
    const userId = req.params.id; // Assuming the user ID is passed as a parameter in the request URL
    try {
        // Check if the user exists
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the password if it's provided
        let hashedPassword = existingUser.password; // Use existing hashed password if not provided in the update
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user fields
        existingUser.name = name;
        existingUser.email = email;
        existingUser.password = hashedPassword;
        existingUser.photo = photo;

        // Save the updated user
        const updatedUser = await existingUser.save();

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
        

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


exports.deleteUser = async (req, res) => {
    const userId = req.params.id; // Assuming the user ID is passed as a parameter in the request URL

    try {
        // Check if the user exists
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await existingUser.deleteOne();

        return res.status(200).json({
            message: "User deleted successfully",
            data: existingUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


