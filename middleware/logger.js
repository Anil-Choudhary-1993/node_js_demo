const winston = require('winston')

function logger(err, req, res, next) {
    //log the exception
    winston.error(err.message, err)
    res.status(500).send('Something failed!')

    // error
    // warn
    // Info
    // verbose
    // debug
    //silly
}

module.exports = logger