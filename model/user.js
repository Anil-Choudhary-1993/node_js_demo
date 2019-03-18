const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, config.get('jwtprivatkey'))
    return token
}

const Users = mongoose.model('Users', userSchema)

function userValidation(user) {
    var schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required()
    }
    return Joi.validate(user, schema)
}

module.exports = {
    Users, validate: userValidation
}