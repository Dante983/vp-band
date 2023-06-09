require('dotenv').config();

const express = require('express');
const { result, get } = require('lodash');
const pageRoutes = require('./routes/pageRoutes');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const { render } = require('ejs');
const connectDB = require('./server/config/db');
const Event = require('./models/events');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo')
const session = require('express-session');
const nodeMail = require("nodemailer");

const dbURI = process.env.MONGODB_URI;
const PORT = 3001 || process.env.PORT;

try {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
} catch (error) {
    console.log(error);
}

//connect to db
connectDB();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret:'vizantija',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));


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
      html: `You got a message from 
      Email : ${email} \n +
      Name: ${name} \n +
      Message: ${body}`,
    };
    try {
      await transporter.sendMail(mailOption);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
  }

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));


app.get('/about', (req, res) => {
    res.render('about',{title: 'About', current: 'about' });
});

app.get('/gallery', (req, res) => {
    res.render('gallery',{title: 'Gallery', current: 'gallery' });
});

app.get('/contact', (req, res) => {
    res.redirect('band');
});

app.post("/band/contact", async (req, res, next) => {
    const { name, email, body } = req.body;
    try {
        await mainMail(name, email, body);
        res.json({ success: true });
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
  });

app.get('/events', (req, res) => {
    res.redirect('band');
});

app.get('/', (req, res) => {
    res.redirect('band');
});

app.use('/band', pageRoutes);
app.use('/', require('./routes/admin'));

// 404 page

app.use((req, res) => {
    res.status(404).render('404', {title: '404' });;
});