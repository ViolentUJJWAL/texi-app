const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, logout } = require('../controllers/auth.controller');
const authCheck = require('../middleware/authcheck');

// Validation rules for the register route
const registerValidationRules = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('phone')
        .isLength({ min: 10, max: 12 })
        .withMessage('Phone number must be 10 to 12 digits')
        .isNumeric()
        .withMessage('Phone number must contain only numbers')
];

// Validation rules for the login route
const loginValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

router.post('/register', registerValidationRules, register);
router.post('/login', loginValidationRules, login);
router.get('/logout', authCheck, logout);

module.exports = router;
