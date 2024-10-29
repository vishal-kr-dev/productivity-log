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
        enum: ["Web Dev", "DSA", "Academics", "Others"],
        required: true

    },
    comments: {
        type: String,
        trim: true
    },

},{
    timestamps: true // This adds createdAt and updatedAt fields automatically
}
)

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;