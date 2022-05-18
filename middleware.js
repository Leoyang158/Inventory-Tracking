const { itemSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Item = require('./models/item');
const Review = require('./models/review');


module.exports.isLoggedIn = (req, res, next) => {
    // console.log('REQ.USER...', req.user);
    if(!req.isAuthenticated()){ 
        req.session.returnTo = req.originalUrl //store the url they are requiring 
        req.flash("error", "you must be signed in")
        return res.redirect('/login')
    }
    next();
}

module.exports.validateItem = (req, res, next) => {
    const { error } = itemSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const car = await Item.findById(id);
    if(!car.author.equals(req.user._id)){ //check whether the user is the same first, if not generate an error
        req.flahs('error', 'You do not have permission to do that!!!')
        return res.redirect('/lists/${id}')
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/lists/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}