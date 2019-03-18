const express = require('express')
const router = express.Router()
const { Users, validate } = require('../model/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Authentication = require('../middleware/auth')

router.get('/', Authentication, async (req,res) => {
    const user = await Users.findById(req.user.id).select('-password')
    res.send(user)
})

router.post('/', async (req, res) => {
    const result = validate(req.body)
    if (result.error) { return res.status(400).send(result.error.details[0].message) }

    let user = await Users.findOne({ email: req.body.email }).lean(true)
    if (user) return res.status(400).send('user already registered!')

    user = new Users(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()

    res.header('x-auth-auth', token).send(JSON.stringify(_.pick(user, ['_id', 'name', 'email'])))
})

router.get('/', async (req, res) => {
    let users = await Users.find().lean(true)
    users = users.map(user => _.pick(user, ['_id', 'name', 'email']))
    res.send(users)
})

module.exports = router