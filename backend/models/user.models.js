const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
});

userSchema.methods.generateAuthToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, parseInt(process.env.PASSWORD_SALT));
    }
});