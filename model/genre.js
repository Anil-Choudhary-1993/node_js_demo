const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
})

const Genres = mongoose.model('Genres', genreSchema)

function genreValidation(genre) {
    var schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = {
    Genres, validate: genreValidation
}