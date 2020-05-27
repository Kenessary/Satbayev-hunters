const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    position:{
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('admins', adminSchema)