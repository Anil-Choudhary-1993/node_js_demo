const Joi = require('joi')
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
})

const Customers = mongoose.model('Customers', customerSchema)

function customerValidation(customer) {
    var schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(3).required(),
    }
    return Joi.validate(customer, schema)
}


module.exports = {
    Customers, validate: customerValidation
}