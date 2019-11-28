const {moveUrl, makeUrl} = require('./url.controller')

const router = require('express').Router()

router.get('/:id', moveUrl)
router.post('/api/url', makeUrl)


module.exports = router