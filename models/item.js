const { Number } = require('mongoose');
const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    // year: String,
    // make: String,
    // model: String,
    // type: String,
    // url: String,
    // description: String,
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // reviews: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Review'
    //     }
    // ]
    itemName: String, 
    amount: Number, 
    startDate: String,
    expireDate: String, 
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

ItemSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Item", ItemSchema);