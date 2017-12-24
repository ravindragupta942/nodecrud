const mongoose = require('mongoose'),
loginSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: "username is required"
    },
    email: {
        type: String,
        unique: true,
        required: "email is required"
    },
    password: {
        type: String,
        required: "password is required"
    },
    mobile: {
        type: String,
        required: "mobile number is required"
    }
},{ timestamps: true })

module.exports = mongoose.model('user', loginSchema)



