const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
// const ExpressError = require('../utils/ExpressError');

const { isLoggedIn, isAuthor, validateItem, validateItem } = require('../middleware');
const Item = require('../models/item');

const lists = require('../controllers/lists');

// the index page, listing all the goods
router.route('/')
    // create a new item , isLoggedIn is the middleware here to check whether the user has logged in yet
    .get(catchAsync(lists.index))
    // post the info to the following page
    .post(isLoggedIn, validateItem, catchAsync(lists.createItem))


router.get('/new', isLoggedIn, lists.renderNewForm)

router.route('/:id')
    // each item has different id, and each id represents diff of pages 
    .get(catchAsync(lists.showItem))  
    // updating a item info
    .put(isLoggedIn, isAuthor, validateItem, catchAsync(lists.validateItem))
    // delete a item page 
    .delete(isLoggedIn, isAuthor, catchAsync (lists.deleteItem));

    // reach to the edit page to edit the item 
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(lists.editItem))

module.exports = router;