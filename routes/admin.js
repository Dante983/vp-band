require("dotenv").config();

const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminLayout = './views/admin';
const jwtsecret = process.env.JWT_SECRET;console.log(jwtsecret);

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

        const token = jwt.sign({ userId: user._id }, jwtsecret);console.log(token);
        res.cookie('token', token, {httpOnly: true});

        res.redirect('/');

        // res.redirect('admin/');
    } catch (error) {
        console.log(error);
    }
    
});


router.post('/register', async (req, res) =>{

    try{

        const { username, password } = req.body;
        const hashedPasssword = await bcrypt.hash(password, 10);
console.log('prvi log', username, password);
        try {
            const user = await User.create({ username, password: hashedPasssword });console.log(user);
            res.status(201).json({message: 'User created', user});
        } catch (error) {
            if(error.code === 11000) {
                res.status(409).json({message: 'User in use'});
            }

            res.status(500).json({message: 'Internal server error'})
        }
        

        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
    
});


module.exports = router;