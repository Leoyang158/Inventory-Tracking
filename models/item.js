const { Number } = require('mongoose');
const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: String, 
    amount: Number, 
    startDate: String,
    expireDate: String, 
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

itemSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Item", itemSchema);