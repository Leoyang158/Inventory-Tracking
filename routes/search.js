const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { isLoggedIn, isAuthor } = require('../middleware'); //cannot book new flightroute if not signed in !!!
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.get('/', isLoggedIn, (req, res) => {  
    res.render('info/add');
});

router.post('/', isLoggedIn, catchAsync(async(req, res) => {
    
    // const { item, amount, startDate, expireDate} = req.params;

    const newItem = new Item({
        author: req.user._id,
        amount: req.body.item.amount,
        itemName: req.body.item.itemName,
        startDate: req.body.item.startDate, 
        expireDate: req.body.item.expireDate,
        description: req.body.item.description,
    })
    await newItem.save();
    req.flash('success','Successfully!');
    res.redirect("/search");
}))


module.exports = router;