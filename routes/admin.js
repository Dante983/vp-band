require("dotenv").config();

const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminLayout = './views/admin';
const jwtsecret = process.env.JWT_SECRET;
const monthNames = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Octobar","Novembar","Decembar"];

//check login

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({message: 'unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, jwtsecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({message: 'unauthorized'});
    }

    
}



router.get('/admin', async (req, res) =>{

    try{
        res.render('admin/index', {layout: adminLayout, current: 'index_admin'})
    } catch (error) {
        console.log(error);
    }
    
});



router.post('/admin', async (req, res) =>{

    try{

        const {username, password} = req.body;
        const user = await User.findOne({ username });

        if(!user) {
            return res.status(401).json({message: 'Pogresan Unos!'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({message: 'Pogresan Unos!'});
        }

        const token = jwt.sign({ userId: user._id }, jwtsecret);
        res.cookie('token', token, {httpOnly: true});

        res.redirect('/admin_events');

        // res.redirect('admin/');
    } catch (error) {
        console.log(error);
    }
    
});


router.get('/admin_events', authMiddleware, async (req, res) =>{

    try {
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

            res.render('admin/events', {title: 'Admin Events', events: result, months: monthNames, sortedMonths: eventsByMonth, current: 'events'})
        });

    } catch (error) {
        console.log(error);
    }
});



router.get('/add-event', authMiddleware, async (req, res) => {
    try {
        const data = await Event.find();
        res.render('admin/add-event', {data});
    } catch (error) {
        console.log(error);
    }
});

//dodaj dogadjaj
router.post('/add-event', authMiddleware, async (req, res) => {
    try {
        try {
            const newEvent = new Event({
                event: req.body.event,
                year: req.body.year,
                location: req.body.location,
                place: req.body.place,
                date: req.body.date
            });

            await Event.create(newEvent);

            res.redirect('/admin_events');

        } catch (error) {
            console.log(error);
        }
        

        
    } catch (error) {
        console.log(error);
    }
});

router.get('/edit-event/:id', authMiddleware, async (req, res) => {
    try {
    
        const event = await Event.findOne({ _id:req.params.id });
        

        res.render('admin/edit-event', {
            event
        });

    } catch (error) {
        console.log(error);
    }
});


router.put('/edit-event/:id', authMiddleware, async (req, res) => {
    try {
    
        await Event.findByIdAndUpdate(req.params.id, {
            event: req.body.event,
            year: req.body.year,
            location: req.body.location,
            place: req.body.place,
            date: req.body.date,
            updatedAt: Date.now()
        });
        res.redirect(`/edit-event/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
});



router.delete('/delete-event/:id', authMiddleware, async (req, res) => {
    try {console.log('asd',req.params.id);
        await Event.deleteOne({ _id: req.params.id });

        res.redirect('/admin_events');
        
    } catch (error) {
        console.log(error);
    }
});



//logout
router.get('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        // res.json({ message:'Odjavljen uspjesno.' });
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});


// router.post('/register', async (req, res) =>{

//     try{

//         const { username, password } = req.body;
//         const hashedPasssword = await bcrypt.hash(password, 10);
// console.log('prvi log', username, password);
//         try {
//             const user = await User.create({ username, password: hashedPasssword });console.log(user);
//             res.status(201).json({message: 'User created', user});
//         } catch (error) {
//             if(error.code === 11000) {
//                 res.status(409).json({message: 'User in use'});
//             }

//             res.status(500).json({message: 'Internal server error'})
//         }
        

//         res.redirect('/admin');
//     } catch (error) {
//         console.log(error);
//     }
    
// });


module.exports = router;