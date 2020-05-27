const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminmainSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type:Number,
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
    },
    secretword: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('adminsmain', adminmainSchema)