const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { isLoggedIn, isAuthor } = require('../middleware'); //cannot book new flightroute if not signed in !!!
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.get('/', (req, res) => {  
    res.render('info/add');
});

router.post('/', isLoggedIn, catchAsync(async(req, res) => {
    // const { year, make, model, type, url} = req.params;
    // const newCar = new Vehicle({
    //     author: req.user._id,
    //     year: '1998',
    //     make: make,
    //     model: model,
    //     type: type,
    //     url: url
    // });
    // const newCar = new Item(req.body.item);
    // newCar.author = req.user._id;
    const { item, amount, startDate, expireDate} = req.params;
    const newItem = new Item({
        author: req.user._id,
        amount: amount,
        item: item,
        startDate: startDate, 
        expireDate: expireDate,
    })

    await newItem.save();
    req.flash('success','Successfully!');
    res.redirect("/add");
}))


module.exports = router;