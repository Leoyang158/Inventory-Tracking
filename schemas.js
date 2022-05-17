const Joi = require('joi');
const { number } = require('joi');

module.exports.itemSchema = Joi.object({
    car: Joi.object({
        // year: Joi.number().required().min(0),
        // make: Joi.string().required(),
        // model: Joi.string().required(),
        // url: Joi.string().required(),
        // description: Joi.string().required(),
        amount: Joi.string().required(),
        item: Joi.string().required(),
        startDate: Joi.string().required(),
        expireDate: Joi.string().required(),

    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})
