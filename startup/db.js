const winston = require('winston')
const mongoose = require('mongoose')


const config = require('config')

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
        .then(() => winston.info('connected to mongodb'))
}