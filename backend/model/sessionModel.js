const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    user: {
        type: String
    },
    duration: {
        type: Number,
        require: true,
        min: 0
    },
    type: {
        type: String,
        enum: ["Web Dev", "DSA", "Academics", "others"],
        required: true

    },
    comments: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()  // Automatically sets the date when the session is created
    }

})

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;