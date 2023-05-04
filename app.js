const express = require('express');
const { result, get } = require('lodash');
const pageRoutes = require('./routes/pageRoutes');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const { render } = require('ejs');

const dbURI = 'mongodb+srv://savicn209:!Nikolasavic61@cluster0.fkjsunt.mongodb.net/vpband?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3001))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
// app.use(express.static('js'));

app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));



app.get('/about', (req, res) => {
    res.render('about',{title: 'About' });
});

app.get('/gallery', (req, res) => {
    res.render('gallery',{title: 'Gallery' });
});

// app.get('/events', (req, res) => {
//     res.render('events',{title: 'Events' });
// });

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