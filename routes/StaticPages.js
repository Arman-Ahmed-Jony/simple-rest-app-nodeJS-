const express = require('express')
const path = require('path')

const router = express.Router()

router.get('', (req, res) => {
  res.render('../static', { title: 'Hey', message: 'Hello there!' })
})

router.get('/test', (req, res) => {
  res.sendFile(path.resolve('./static/test.html'))
})

module.exports = router
