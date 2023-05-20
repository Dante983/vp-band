const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    event: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    place: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
}, {timestamps: true});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;