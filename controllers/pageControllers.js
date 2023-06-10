const Event = require('../models/events');
const monthNames = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Octobar","Novembar","Decembar"];
const nodeMail = require("nodemailer");


async function mainMail(name, email, body) {
    const transporter = await nodeMail.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });
    
    const mailOption = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: 'Upit sa web stranice',
      html: `Imate poruku od <br>
        <strong>Email:</strong> ${email} <br>
        <strong>Ime:</strong> ${name} <br>
        <strong>Poruka:</strong> ${body}`,
    };
    try {
      await transporter.sendMail(mailOption);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
}

const page_index = (req, res) => {
    const startDate = new Date(); // Set to today's date
    startDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    Event.find({ date: { $gte: startDate } }).sort({ date: 1 }).limit(4)
        .then((result) => {

            const eventsWithDayAndMonth = result.map((event) => {
                const eventCopy = { ...event };
                eventCopy.day = event.date.getDate();
                eventCopy.month = monthNames[event.date.getMonth()]; // Get the month name
                return eventCopy;
            });
            
            res.render('page/index', { events: eventsWithDayAndMonth, monthNames: monthNames,  current: 'index'});
        })
        .catch((err) => {
            console.log(err);
        });
};

const page_events = (req, res) => {
    Event.find().sort({createdAt: -1})
    .then((result) => {
        const eventsByMonth = {};

        result.forEach(document => {
            const date = new Date(document.date);
            const month = monthNames[date.getMonth()];

            if (!eventsByMonth[month]) {
                eventsByMonth[month] = [];
            }

            eventsByMonth[month].push(document.event);
        });

        res.render('page/events', {title: 'all Events', events: result, months: monthNames, sortedMonths: eventsByMonth, current: 'events'})
    })
    .catch((err) => {
        console.log(err);
    })
}

const page_contact = ( req, res ) => {
    res.render('page/contact', {title: 'Contact', current: 'contact' });
};

const page_contact_post = async ( req, res ) => {
    const { name, email, body } = req.body;
    try {
        await mainMail(name, email, body);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};

module.exports = {
    page_index,
    page_events,
    page_contact,
    page_contact_post
    // page_gallery
}