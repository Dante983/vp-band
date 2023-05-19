const Event = require('../models/events');
const monthNames = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Octobar","Novembar","Decembar"];

const page_index = (req, res) => {
    res.render('page/index');
}

const page_events = (req, res) => {
    Event.find().sort({createdAt: -1})
    .then((result) => {

        const eventsByMonth = {};

        result.forEach(document => {
            const date = new Date(document.date); // Assuming 'date' is the field name in your MongoDB collection
            // console.log(document.date);
            // Extract the month from the date
            const month = monthNames[date.getMonth()];
            
            // If the month is not yet present in the 'eventsByMonth' object, initialize it as an empty array
            if (!eventsByMonth[month]) {
                eventsByMonth[month] = [];
            }
            
            // Push the event from the document to the respective month array
            eventsByMonth[month].push(document.event); // Assuming 'event' is the field name in your MongoDB collection
        });

        // console.log(typeof eventsByMonth);
        // console.log(typeof monthNames);

        res.render('page/events', {title: 'all Events', events: result, months: monthNames, sortedMonths: eventsByMonth})
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