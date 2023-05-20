require('dotenv').config();

const express = require('express');
const { result, get } = require('lodash');
const pageRoutes = require('./routes/pageRoutes');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const { render } = require('ejs');
const connectDB = require('./server/config/db');
const Event = require('./models/events');

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then((result) => app.listen(3001))
    .catch((err) => console.log(err));

const PORT = 5000 || process.env.PORT;

//connect to db
connectDB();

app.set('view engine', 'ejs');

app.use(express.static('public'));
// app.use(express.static('js'));

app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

// function inserPostData () {
//     Event.insertMany([
//         {
//             event: 'Svadba',
//             year: 2023,
//             location: 'Mrkonjic Grad',
//             place: 'Svadbeni salon Manjaca',
//             date: new Date("2023-10-13")
//         },{
//             event: 'Krstenje',
//             year: 2023,
//             location: 'Doboj',
//             place: 'Svadbeni salon Pivo',
//             date: new Date("2023-12-11")
//         },{
//             event: 'Rodjendan',
//             year: 2024,
//             location: 'Banja Luka',
//             place: 'Astorya',
//             date: new Date("2023-08-04")
//         },{
//             event: 'Svadba',
//             year: 2023,
//             location: 'Bijeljina',
//             place: 'Svadbeni salon Sunce',
//             date: new Date("2024-04-22")
//         },{
//             event: 'Svadba',
//             year: 2023,
//             location: 'Srbac',
//             place: 'Dynamic :(',
//             date: new Date("2024-06-07")
//         },
//     ])
// }



app.get('/about', (req, res) => {
    res.render('about',{title: 'About' });
});

app.get('/gallery', (req, res) => {
    res.render('gallery',{title: 'Gallery' });
});

app.get('/contact', (req, res) => {
    res.render('contact',{title: 'Contact' });
});

app.get('/events', (req, res) => {
    res.redirect('page');
});

app.get('/', (req, res) => {
    res.redirect('page');
});

app.use('/page', pageRoutes);

// 404 page

app.use((req, res) => {
    res.status(404).render('404', {title: '404' });;
});