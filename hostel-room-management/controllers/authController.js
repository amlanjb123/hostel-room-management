const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const config = require('../config/config');

exports.login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Check if student exists
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: student._id },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        // Send response
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                // Add other non-sensitive student details as needed
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// You might also want to add registration functionality
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if student already exists
        let student = await Student.findOne({ email });
        if (student) {
            return res.status(400).json({
                success: false,
                message: 'Student already exists with this email'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new student
        student = await Student.create({
            name,
            email,
            password: hashedPassword
        });

        // Create JWT token
        const token = jwt.sign(
            { id: student._id },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        // Send response
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Logout (if needed - typically handled on client side)
exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select('-password');
        res.status(200).json({
            success: true,
            student
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user data'
        });
    }
};