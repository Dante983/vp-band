const Event = require('../models/events');

const page_index = (req, res) => {
    res.render('page/index');
}

const page_events = (req, res) => {
    Event.find().sort({createdAt: -1})
    .then((result) => {
        console.log(result);
        res.render('page/events', {title: 'all Events', events: result})
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = {
    page_index,
    page_events
    // page_gallery
}