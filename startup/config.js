const config = require('config')

module.exports = function () {
    if (!config.get('jwtprivatekey')) {
        throw new error('FATAL error : jwtprivatekey is not defined')
    }
}