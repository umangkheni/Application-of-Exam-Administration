const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists. Please register with a different email.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', user: newUser, token });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'User already exists. Please register with a different email.' });
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged in successfully', token, data: user });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};