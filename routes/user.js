const express = require('express')
const route = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, 'dfghjkldfghjk');
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.redirect('/login');
    }
}

route.get('/login', (req, res) => {
    res.render('User/login');
})


route.get('/signup', (req, res) => {
    res.render('User/signup');
})




route.get('/dashboard', authenticateUser, async (req, res) => {
    try {
        const user = await User.findOne({where:{id:req.user.id}})
        res.render('User/dashboard', { user })
    } catch (error) {
        res.redirect('user/login')
    }
})


route.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existUser = await User.findOne({ where: { email } });
        if (existUser) {
            return res.render('User/signup', { error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword })
        res.render('User/signup', { error: null, success: 'User registered successfully! You can now log in' });
    } catch (error) {
        res.status(500).render('User/signup', { error: 'An error occurred during registration' });
    }
})


route.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.render('User/login', { error: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('User/login', { error: 'Invalid password' })
        }

        const token = jwt.sign({ id: user.id }, 'dfghjkldfghjk', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/user/dashboard');
    } catch (error) {
        res.status(500).render('User/login', { error: 'An error occurred while logging in' });
    }
})

module.exports = route;
