const User = require('../models/user.model');
const Captain = require('../models/captain.model');
const { validationResult } = require('express-validator');

exports.getProfile = async (req, res) => {
    const userType = req.userType; // 'user' or 'captain'
    const userId = req.user._id;

    try {
        const model = userType === 'user' ? User : Captain;
        const profile = await model.findById(userId);

        if (!profile) {
            return res.status(404).json({ error: `${userType} not found` });
        }

        return res.status(200).json({ profile });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error });
    }
};

exports.updateProfile = async (req, res) => {
    const userType = req.userType; // 'user' or 'captain'
    const userId = req.user._id;
    const { name, email, phone, ...rest } = req.body;

    try {
        if (validationResult(req).errors.length > 0) {
            return res.status(400).json({ error: validationResult(req).errors[0].msg });
        }

        const model = userType === 'user' ? User : Captain;

        // Check if email or phone is already in use by another user
        const existingRecord = await model.findOne({
            $and: [
                { _id: { $ne: userId } },
                { $or: [{ email }, { phone }] },
            ],
        });

        if (existingRecord) {
            return res.status(400).json({ error: 'Email or phone number already in use' });
        }

        // Check if vehicle number already exists for captains
        if (userType === 'captain' && rest.vehicleNumber) {
            const existingVehicle = await Captain.findOne({
                _id: { $ne: userId },
                'vehicle.vehicleNumber': rest.vehicleNumber,
            });

            if (existingVehicle) {
                return res.status(400).json({ error: 'Vehicle number already exists' });
            }
        }

        // Prepare update data
        const updateData = {
            ...(name && { name }),
            ...(email && { email }),
            ...(phone && { phone }),
            ...(userType === 'captain' && {
                ...(rest.isAvailable !== undefined && { isAvailable: rest.isAvailable }),
                ...(rest.isActivate !== undefined && { isActivate: rest.isActivate }),
                ...(rest.location && { location: rest.location }),
                ...(rest.vehicleType && { 'vehicle.vehicleType': rest.vehicleType }),
                ...(rest.vehicleNumber && { 'vehicle.vehicleNumber': rest.vehicleNumber }),
                ...(rest.vehicleModel && { 'vehicle.vehicleModel': rest.vehicleModel }),
                ...(rest.vehicleColor && { 'vehicle.vehicleColor': rest.vehicleColor }),
            }),
        };

        const updatedProfile = await model.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ error: `${userType} not found` });
        }

        return res.status(200).json({ profile: updatedProfile });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error });
    }
};

exports.changePassword = async (req, res) => {
    const userType = req.userType;
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    try {
        if(validationResult(req).errors.length > 0) {
            return res.status(400).json({ error: validationResult(req).errors[0].msg });
        }
        if(userType === 'user') {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!(await user.matchPassword(oldPassword))) {
                return res.status(400).json({ error: 'Invalid old password' });
            }
            user.password = newPassword;
            await user.save();
            return res.status(200).json({ message: 'Password changed successfully' });
        }else if(userType === 'captain') {
            const captain = await Captain.findById(userId);
            if (!captain) {
                return res.status(404).json({ error: 'Captain not found' });
            }
            if (!(await captain.matchPassword(oldPassword))) {
                return res.status(400).json({ error: 'Invalid old password' });
            }
            captain.password = newPassword;
            await captain.save();
            return res.status(200).json({ message: 'Password changed successfully' });
        } else {
            return res.status(400).json({ error: 'Invalid user type' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
        
    }
}