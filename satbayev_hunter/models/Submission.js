const mongoose = require('mongoose')
const Schema = mongoose.Schema

const submissionSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },    
    email:{
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
    faculty:{
        type: String,
        required: true
    },
    docsSrc:{
        type: String,
        default: ''
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('submissions', submissionSchema)