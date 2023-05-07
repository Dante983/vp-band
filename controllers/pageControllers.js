const Event = require('../models/events');
const months = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Octobar","Novembar","Decembar"];

const page_index = (req, res) => {
    res.render('page/index');
}

const page_events = (req, res) => {
    Event.find().sort({createdAt: -1})
    .then((result) => {
        // console.log(result);
        // result.forEach(res => {
        //     const date = res.date;
        //     let mjesec = month[date.getMonth()];
        //     console.log(mjesec);
        // })
        res.render('page/events', {title: 'all Events', events: result, months: months})
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