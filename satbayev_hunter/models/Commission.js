const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commissionSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    middname:{
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
    degree:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('commissions', commissionSchema)