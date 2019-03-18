const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', { title: 'NodeJs App', message: "Demo express app with nodejs" })
})

module.exports = router