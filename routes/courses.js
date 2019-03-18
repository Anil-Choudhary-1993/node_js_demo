const express = require('express')
const router = express.Router()
const Joi = require('joi')

const Courses = [
    { id: 1, name: 'Math' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Science' }
]

router.get('/', (req, res) => {
    res.send(JSON.stringify(Courses))
})

router.get('/:id', (req, res) => {
    const course = Courses.find(c => c.id === parseInt(req.params.id))
    if (!course) { return res.status(404).send(`The Course with this id ${req.params.id} is not available`) }
    res.send(JSON.stringify(course))
})

router.post('/', (req, res) => {

    const result = courseValidation(req.body)
    if (result.error) { return res.status(400).send(result.error.details[0].message) }

    const course = {
        id: Courses.length + 1,
        name: req.body.name
    }
    Courses.push(course)
    res.send(JSON.stringify(course))

})

router.put('/:id', (req, res) => {

    let course = Courses.find(c => c.id === parseInt(req.params.id))
    if (!course) { return res.status(404).send(`The Course with this id ${req.params.id} is not available`) }

    const result = courseValidation(req.body)
    if (result.error) { return res.status(400).send(result.error.details[0].message) }

    course.name = req.body.name
    res.send(JSON.stringify(course))

})

router.delete('/:id', (req, res) => {

    let course = Courses.find(c => c.id === parseInt(req.params.id))
    if (!course) { return res.status(404).send(`The Course with this id ${req.params.id} is not available`) }

    const courseIndex = Courses.indexOf(course)
    Courses.splice(courseIndex, 1)
    res.send(course)

})

function courseValidation(course) {
    var schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

module.exports = router