const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', User)