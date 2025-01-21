const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { getProfile, updateProfile, changePassword } = require('../controllers/profile.controller');
const authCheck = require('../middleware/authcheck');
const { get } = require('mongoose');


const updateUserValidationRules = [
    body('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address'),
    body('phone')
        .optional()
        .isLength({ min: 10, max: 12 })
        .withMessage('Phone number must be 10 to 12 digits')
        .isNumeric()
        .withMessage('Phone number must contain only numbers')
];

// Validation rules for captain update
const updateCaptainValidationRules = [
    body('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address'),
    body('phone')
        .optional()
        .isLength({ min: 10, max: 12 })
        .withMessage('Phone number must be 10 to 12 digits')
        .isNumeric()
        .withMessage('Phone number must contain only numbers'),
    body('vehicleType')
        .optional()
        .isIn(['bike', 'car', 'auto'])
        .withMessage('Invalid vehicle type'),
    body('vehicleNumber')
        .optional()
        .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/)
        .withMessage('Invalid vehicle number format (Ex: TN01AB1234)'),
    body('vehicleModel')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Vehicle model must be at least 3 characters long'),
    body('vehicleColor')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Vehicle color must be at least 3 characters long'),
    body('isAvailable')
        .optional()
        .isBoolean()
        .withMessage('isAvailable must be a boolean'),
    body('isActivate')
        .optional()
        .isBoolean()
        .withMessage('isActivate must be a boolean'),
    body('location.lat')
        .optional()
        .isFloat()
        .withMessage('Latitude must be a number'),
    body('location.long')
        .optional()
        .isFloat()
        .withMessage('Longitude must be a number')
];

const changePasswordValidationRules = [
    body('oldPassword')
        .notEmpty()
        .withMessage('Old password is required'),
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
]


router.get('/me', authCheck, getProfile);
router.put('/user',authCheck, updateUserValidationRules, updateProfile);
router.put('/captain',authCheck, updateCaptainValidationRules, updateProfile);
router.put('/change-password',authCheck, changePasswordValidationRules, changePassword);


module.exports = router;