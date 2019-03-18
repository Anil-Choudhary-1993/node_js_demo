const express = require('express')
const router = express.Router()
const { Users } = require('../model/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')

router.post('/', async (req, res) => {
    const result = validate(req.body)
    if (result.error) { return res.status(400).send(result.error.details[0].message) }

    let user = await Users.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('invalid email and password!')

    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) return res.status(400).send('invalid email and password!')

    const token = user.generateAuthToken()

    res.header('x-auth-auth',token).send(JSON.stringify(_.pick(user, ['_id', 'name', 'email'])))
})

function validate(user) {
    var schema = {
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required()
    }
    return Joi.validate(user, schema)
}

module.exports = router