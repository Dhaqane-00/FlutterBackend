const {User} = require("../Model/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const path = require('path');
const { env } = require("process");
exports.createUser = async (req, res) => {
    const { name, email, password, role, address } = req.body;
    let photoPath =process.env.Default_Photo_URL;

    if (req.file) {
        const photo = req.file.path;
        photoPath = process.env.IMAGE_URL + photo.replace(/\\/g, "/");
    }

    try {
        // Convert email to lowercase
        const lowerCaseEmail = email.toLowerCase();

        // Check if user exists
        const existingUser = await User.findOne({ email: lowerCaseEmail });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const OTP = generateOTP();

        // Create user with hashed password and OTP details
        const user = await User.create({
            name,
            email: lowerCaseEmail,
            password: hashedPassword,
            role,
            address,
            photo: photoPath,
            verify: false,
            otp: OTP,
            otpExpires: Date.now() + 10 * 60 * 1000 // 10 minutes from now
        });

        // Send OTP to the user's email
        await sendOTPByEmail(lowerCaseEmail, OTP);

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, name, email: lowerCaseEmail, role }, process.env.JWT_SECRET, { expiresIn: '1D' });

        return res.status(201).json({
            message: "User created successfully, OTP sent to email",
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
        // Convert email to lowercase
        const lowerCaseEmail = email.toLowerCase();

        const existingUser = await User.findOne({ email: lowerCaseEmail });

        if (!existingUser) {
            return res.status(404).json({ message: "Email not found" });
        }
        if (!existingUser.verify) {
            return res.status(403).json({ message: "User not verified" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Assuming `existingUser` contains the role information
        const { role } = existingUser;

        // Generate JWT token
        const token = jwt.sign(
            { userId: existingUser._id, email: lowerCaseEmail, role: role }, // Include role here
            process.env.JWT_SECRET,
            { expiresIn: '1D' }
        );

        return res.status(200).json({
            message: "User logged in successfully",
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
    const { name, email, password, role, address, verify, otp, otpExpires } = req.body;
    const userId = req.params.id;

    let photoPath =process.env.Default_Photo_URL;

    if (req.file) {
        const photo = req.file.path;
        photoPath = process.env.IMAGE_URL + photo.replace(/\\/g, "/");
    }
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
        existingUser.name = name || existingUser.name;
        existingUser.email = email || existingUser.email;
        existingUser.password = hashedPassword;
        existingUser.photo = photoPath || existingUser.photo;
        existingUser.role = role || existingUser.role;
        existingUser.address = address || existingUser.address;
        existingUser.verify = verify !== undefined ? verify : existingUser.verify;
        existingUser.otp = otp || existingUser.otp;
        existingUser.otpExpires = otpExpires || existingUser.otpExpires;

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
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User retrieved successfully",
            data: user
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
exports.ForgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 3600000; // OTP expires in 1 hour
        await user.save();

        // Send reset password email with OTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'abdilaahimowliid@gmail.com',
              pass: 'trjm cgzx yqwk ajhp' // Updated app password
            }
          });

        const mailOptions = {
            from: 'abdilaahimowliid@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Your OTP (One-Time Password) for resetting your password is: ${otp}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to send OTP email" });
            }
            return res.status(200).json({ message: "OTP email sent" });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.ForgetVerifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find user by email and OTP
        const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // OTP is valid, proceed to allow password reset
        return res.status(200).json({ message: "OTP verified successfully" , user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear OTP
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully", user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};



// Function to send OTP via email
const sendOTPByEmail = async (email, otp) => {
    try {

        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'abdilaahimowliid@gmail.com',
              pass: 'trjm cgzx yqwk ajhp' // Updated app password
            }
          });

        // Send mail with defined transport object
        await transporter.sendMail({
            from: 'abdilaahimowliid@gmail.com', // Sender email address
            to: email, // Recipient email address
            subject: 'Your OTP', // Email subject
            text: `Your OTP is: ${otp}` // Email body with OTP
        });

        console.log('OTP sent successfully to', email);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};
// Function to generate a random OTP
// Function to generate a random 4-digit OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
};


// Example route for initiating OTP verification
exports.OTPVerification = async (req, res) => {
    const { email } = req.body;

    try {
        // Generate OTP
        const OTP = generateOTP();

        // Send OTP to the user's email
        await sendOTPByEmail(email, OTP);

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


// Example route for verifying OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if OTP is valid and not expired
        if (user.otp === otp && user.otpExpires > Date.now()) {
            // OTP is valid and not expired
            user.verify = true;
            user.otp = undefined; // Clear OTP after successful verification
            user.otpExpires = undefined; // Clear OTP expiry time
            await user.save();

            return res.status(200).json({ message: "OTP verification successful" });
        } else {
            // OTP is invalid or expired
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

