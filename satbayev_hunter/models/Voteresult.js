const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteresultSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    surname:{
        type:String,
        required: true
    },
    position:{
        type:String
    },
    posVote:{
        type: Number,
        required: true
    },
    negVote:{
        type: Number,
        required: true
    },
    totalvote:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('voteresults', voteresultSchema)