const Joi = require('joi');
const { number } = require('joi');

module.exports.itemSchema = Joi.object({
    item: Joi.object({
        description: Joi.string().required(),
        amount: Joi.number().required(),
        itemName: Joi.string().required(),
        startDate: Joi.date().required(),
        expireDate: Joi.date().required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})
