const User = require('../models/user.model');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.CreateUser = async (req, res) => {
    try {

        // get the request body 
        const { firstname, lastname, email, userPassword, confirmPassword } = req.body

        // verify if the email exists 
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        if (!firstname || !lastname || !email || !userPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Provide all credentials"
            });
        } else if (userPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords does not match"
            });
        }

        // Hash our password
        const saltRounds = 10;
        const password = await bcrypt.hash(userPassword, saltRounds);

        // Register the user 
        const user = {
            firstname,
            lastname,
            email,
            password
        }

        // Store the user data in the database
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).json({
            message: "Registered User successfully",
            newUser
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        // get email & password
        const { email, password } = req.body
        // Verify if the email exists
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(400).json({
                message: "User with this email doesnot exist"
            })
        }
        // verify if passwords match
        const passwordsMatch = bcrypt.compare(password, userExists.password)
        if (!passwordsMatch) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }
        // Passwords match, generate a jwt token, Auntenticated
        const token = jwt.sign(userExists.id, process.env.SECRET);

        return res.json({
            message: "Login successful",
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    const userToken = req.user;
    // Get req.body 
    const { firstname, lastname, email, userPassword } = req.body

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds)

    const newUserDetails = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword
    }
    // Update by ID
    const updateUser = await User.findByIdAndUpdate(userToken, newUserDetails);
    return res.json({
        message: "Updated User successfully",
        User: newUserDetails
    })
}

exports.deleteUser = async (req, res) => {
    const userToken = req.user;
    // delete user with email
    const deletedUser = await User.findByIdAndDelete(userToken);
    return res.json({
        message: "Deleted User successfully",
        user: deletedUser
    })
}