
const winston = require('winston')
const express = require('express')
const app = express()

require('./startup/logging')
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')
require('./startup/validation')();


// templating
// app.set('view engine', 'pug')
// app.set('views', './views') 

const Port = process.env.PORT || 3000
app.listen(Port, () => winston.info(`Listening on port ${Port}...`))

