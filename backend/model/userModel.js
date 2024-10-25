const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
        match: /^[a-z0-9]+$/,
    },
    year: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword: {
        type: String,
        require: true
    }
})

userSchema.pre('save', (next) => {
    this.confirmPassword = undefined;
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;