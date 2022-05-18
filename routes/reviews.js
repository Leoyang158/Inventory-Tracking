const express = require('express');
const router = express.Router({mergeParams: true}); 
//make sure set mergeParm to be true, to share the same params in the same file 

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const item = require('../models/item');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router; 