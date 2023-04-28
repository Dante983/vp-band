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

app.get('/', (req, res) => {
    res.redirect('page');
})

app.get('/about', (req, res) => {

    res.render('about',{title: 'About' });

});

app.use('/page', pageRoutes);