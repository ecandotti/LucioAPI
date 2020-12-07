const mongoose = require('mongoose')

const Schema = mongoose.Schema

let Song = new Schema({
    songName: {
        type: String,
        required: "Il me faut un nom"
    },
    songURL: {
        type: String,
        required: 'Il me faut un URL'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Song', Song)