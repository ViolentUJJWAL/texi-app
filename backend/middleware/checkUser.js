const user = require('../models/user.models');
const captain = require('../models/captain.models');

exports.checkUser = async (req, res, next) => {
    const id = req.user._id;
    const userRecord = await user.findById(id);
    if (userRecord) {
        next();
    } else {
        return res.status(401).json({ error: 'Please authenticate' });
    }
}

exports.checkCaptain = async (req, res, next) => {
    const id = req.user._id;
    const captainRecord = await captain.findById(id);
    if (captainRecord) {
        next();
    } else {
        return res.status(401).json({ error: 'Please authenticate' });
    }
}