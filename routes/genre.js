const express = require('express')
const router = express.Router()
const { Genres, validate } = require('../model/genre')
const Authentication = require('../middleware/auth')
const asyncMiddleare = require('../middleware/asyncMiddleare')

router.get('/', asyncMiddleare(async (req, res) => {
    const genres = await Genres.find()
    res.send(JSON.stringify(genres))
}))

router.get('/:id', asyncMiddleare(async (req, res) => {
    const genre = await Genres.findById(req.params.id)
    if (!genre) { return res.status(404).send(`The genre with this id ${req.params.id} is not available`) }
    res.send(JSON.stringify(genre))
}))

// router.post('/', Authentication, async (req, res) => {
router.post('/', asyncMiddleare(async (req, res) => {
    const result = validate(req.body)
    if (result.error) { return res.status(400).send(result.error.details[0].message) }

    let genre = new Genres({
        name: req.body.name
    })
    genre = await genre.save()
    res.send(JSON.stringify(genre))

}))

router.put('/:id', asyncMiddleare(async (req, res) => {
    const result = validate(req.body)
    if (result.error) { return res.status(400).send(result.error.details[0].message) }

    let genre = await Genres.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genre) { return res.status(404).send(`The genre with this id ${req.params.id} is not available`) }

    res.send(genre)

}))

router.delete('/:id', asyncMiddleare(async (req, res) => {

    let genre = await Genres.findByIdAndRemove(req.params.id)
    if (!genre) { return res.status(404).send(`The genre with this id ${req.params.id} is not available`) }

    res.send(genre)

}))


module.exports = router