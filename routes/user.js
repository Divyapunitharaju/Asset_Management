const express = require('express')
const route = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET || 'ehwrjgffdrtftgyhuj'

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Token not here...Please log in' });
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        console.error("Token verification error:", error)
        return res.status(403).json({ message: 'Invalid or expired token' })
    }
}


route.get('/login', (req, res) => {
    res.status(200).render('User/login')
});

route.get('/signup', (req, res) => {
    res.status(200).render('User/signup')
});

route.get('/dashboard', authenticateUser, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).render('User/dashboard', { user })
    } catch (error) {
        console.error("Error fetching user data", error);
        res.status(500).json({ message: 'An error occurred while fetching user data' });
    }
})

route.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existUser = await User.findOne({ where: { email } });
        if (existUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ user, message: 'User registered successfully....You can log in now' });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
})

route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true})
        console.log("Redirecting to dashboard")
        // res.redirect('/dashboard')
        res.status(200).json({ message: "Login successful" })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'An error occurred while logging in' });
    }
})

module.exports = route
