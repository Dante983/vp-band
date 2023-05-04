const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    year: {
        type: Number,
        require: true
    },
    event: {
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