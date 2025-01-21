const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const Captain = require('../models/captain.models');

const authCheck = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') || req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Please authenticate' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        const captain = await Captain.findOne({ _id: decoded.id });
        if (!user && !captain) {
            return res.status(401).json({ error: 'Please authenticate' });
        }
        req.user = user || captain;
        req.userType = user ? 'user' : 'captain';
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Please authenticate' });
    }
}

module.exports = authCheck;