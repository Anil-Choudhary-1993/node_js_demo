const express = require('express')
const Genres = require('../routes/genre')
const Customers = require('../routes/customers')
const Home = require('../routes/home')
const Users = require('../routes/users')
const Auth = require('../routes/auth')
const morgan = require('morgan')
const error = require('../middleware/error')
const logger = require('../middleware/logger')

module.exports = function (app) {
    if (process.env.NODE_ENV != 'production') {
        app.use(morgan('tiny'));
    }
    app.use(express.json())
    app.use(express.static('public'))
    app.use('/api/genres', Genres)
    app.use('/api/customers', Customers)
    app.use('/api/users', Users)
    app.use('/api/auth', Auth)
    app.use('/', Home)
    app.use(error)
    app.use(logger)

}