// require('express-async-errors')    use this then there is no need for asyncMiddleware

const winston = require('winston')
require('winston-mongodb')

module.exports = function () {

    winston.handleExceptions(new winston.transports.File({ filename: 'unCaughtExceptions.log' }))

    process.on("unhandledRejection", (ex) => {
        throw ex
    })


    winston.add(winston.transports.File, { filename: 'logfile.log' })
    winston.add(winston.transports.MongoDB, {
        db:
            'mongodb://localhost/vidly',
        level: 'info'
    })

}

// winston.exceptions.handle(new winston.transports.File({ filename: 'unCaughtExceptions.log' }))

/*
//USE this to handle global  uncaughtException but not a good aproach
process.on("uncaughtException", (ex) => {
    console.log('we got an uncaughtException')
    winston.error(ex.message, ex)
    process.exit(1)
})
*/

