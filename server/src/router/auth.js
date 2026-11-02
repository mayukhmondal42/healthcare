const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const validator = require('validator');

authRouter.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname) {
            return res.status(400).json({ error: "First name and last name are required" });
        }
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        if (!password || !validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Password must be strong (min 8 chars, uppercase, number, symbol)" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.HASH_PASS) || 10);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        const isProd = process.env.NODE_ENV === 'production';
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });

        const userSafe = { id: newUser._id, firstname: newUser.firstname, lastname: newUser.lastname, email: newUser.email };
        res.status(201).json({ message: 'User signed up successfully', user: userSafe });

    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ error: error.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // ✅ FIX: select:false er jonno +password lagbe
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ error: "User not found, signup first" });
        }

        if (!user.password) {
            return res.status(400).json({ error: "Password not set for this account. Please signup again with a new email." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        const isProd = process.env.NODE_ENV === 'production';
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });

        const userSafe = { id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email };
        res.status(200).json({ message: 'Login successful', user: userSafe, token });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Error during login', message: error.message });
    }
});

authRouter.post('/logout', (req, res) => {
    try {
        const isProd = process.env.NODE_ENV === 'production';
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: 'Error during logout', message: error.message });
    }
});

module.exports = { authRouter };