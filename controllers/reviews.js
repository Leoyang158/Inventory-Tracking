const Item = require('../models/item');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const good = await Item.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    good.reviews.push(review);
    await review.save();
    await good.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/lists/${good._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Item.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/lists/${id}`);
}
