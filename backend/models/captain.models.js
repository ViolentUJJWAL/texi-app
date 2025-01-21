const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const captainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minLength: [3, 'Name must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [`^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`, 'Please provide a valid email'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        minLength: [10, 'Phone number must be 10 to 12 digits'],
        maxLenght: [12, 'Phone number must be 10 to 12 digits'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false
    },
    soketId: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isActivate: {
        type: Boolean,
        default: false
    },
    location: {
        lat: {
            type: Number,
        },
        long: {
            type: Number,
        }
    },
    vehicle: {
        vehicleType: {
            type: String,
            required: [true, 'Please provide a vehicle type'],
            enum: ['bike', 'car', 'auto']
        },
        vehicleNumber: {
            type: String,
            required: [true, 'Please provide a vehicle number'],
            unique: true,
            match: [`^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$`, 'Please provide a valid vehicle number (Ex: TN01AB1234)']
        },
        vehicleModel: {
            type: String,
            required: [true, 'Please provide a vehicle model'],
            minLength: [3, 'Vehicle model must be at least 3 characters']
        },
        vehicleColor: {
            type: String,
            required: [true, 'Please provide a vehicle color'],
            minLength: [3, 'Vehicle color must be at least 3 characters']
        },
    },
}, {
    timestamps: true
});

captainSchema.methods.generateAuthToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

captainSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, parseInt(process.env.PASSWORD_SALT));
    }
});