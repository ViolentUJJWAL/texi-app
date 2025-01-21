const User = require('../models/user.model');
const Captain = require('../models/captain.model');
const {validationResult} = require('express-validator');

exports.register = async (req, res) => {
    const { role } = req.body;
    if(validationResult(req).errors.length > 0) {
        return res.status(400).json({ error: validationResult(req).errors[0].msg });
    }
    if (role === 'user') {
        try {
            const { email, name, phone, password } = req.body;
            if (!email || !name || !phone || !password) {
                return res.status(400).json({ error: 'Please provide all fields' });
            }
            if (await User.findOne({ $or: [{ email }, { phone }] })) {
                return res.status(400).json({ error: 'User already exists' });
            }
            const user = await User.create({ email, name, phone, password });
            const token = await user.generateAuthToken();
            return res.status(201).json({ user, token });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error });
        }
    } else if (role === 'captain') {
        try {
            const { email, name, phone, password, vehicleType, vehicleNumber, vehicleModel, vehicleColor } = req.body;
            if (!email || !name || !phone || !password || !vehicleType || !vehicleNumber || !vehicleModel || !vehicleColor) {
                return res.status(400).json({ error: 'Please provide all fields' });
            }
            if (await Captain.findOne({ $or: [{ email }, { phone }] })) {
                return res.status(400).json({ error: 'Captain already exists' });
            }
            if (await Captain.findOne({ vehicle: { vehicleNumber } })) {
                return res.status(400).json({ error: 'Vehicle number already exists' });
            }
            const captain = await Captain.create({ email, name, phone, password, vehicle: { vehicleType, vehicleNumber, vehicleModel, vehicleColor } });
            const token = await captain.generateAuthToken();
            return res.status(201).json({ captain, token });
        } catch (error) {
            return res.status(400).json({ error });
        }
    } else {
        console.log(error);
        return res.status(400).json({ error: 'Invalid role' });
    }
}

exports.login = async (req, res) => {
    try {
        const { role } = req.body;
        if(validationResult(req).errors.length > 0) {
            return res.status(400).json({ error: validationResult(req).errors[0].msg });
        }
        if (role === "user") {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Please provide all fields' });
            }
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            if (!(await user.matchPassword(password))) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            const token = await user.generateAuthToken();
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.status(200).json({ user, token });
        } else if (role === "captain") {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Please provide all fields' });
            }
            const captain = await Captain.findOne({ email });
            if (!captain) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            if (!(await captain.matchPassword(password))) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            const token = await captain.generateAuthToken();
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.status(200).json({ captain, token });
        } else {
            console.log(error);
            return res.status(400).json({ error: 'Invalid role' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out' });
}