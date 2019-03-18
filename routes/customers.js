const express = require('express')
const router = express.Router()
const { Customers, validate } = require('../model/customer')

router.get('/', async (req, res) => {
    const customers = await Customers.find()
    res.send(JSON.stringify(customers))
})

router.get('/:id', async (req, res) => {
    const customer = await Customers.findById(req.params.id)
    if (!customer) { return res.status(404).send(`The customer with this id ${req.params.id} is not available`) }
    res.send(JSON.stringify(customer))
})

router.post('/', async (req, res) => {

    const result = validate(req.body)
    if (result.error) { return res.status(400).send(result.error.details[0].message) }

    let customer = new Customers({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })
    customer = await customer.save()
    res.send(JSON.stringify(customer))

})

router.put('/:id', async (req, res) => {
    const result = validate(req.body)
    if (result.error) { return res.status(400).send(result.error.details[0].message) }

    let customer = await Customers.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!customer) { return res.status(404).send(`The customer with this id ${req.params.id} is not available`) }

    res.send(customer)

})

router.delete('/:id', async (req, res) => {

    let customer = await Customers.findByIdAndRemove(req.params.id)
    if (!customer) { return res.status(404).send(`The customer with this id ${req.params.id} is not available`) }

    res.send(customer)

})


module.exports = router