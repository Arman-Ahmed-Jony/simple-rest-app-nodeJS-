const express = require('express')
const path = require('path')

const router = express.Router()

router.get('', (req, res) => {
  res.render('../static', { title: 'Hey', message: 'Hello there!' })
})

router.get('/profile', (req, res) => {
  res.sendFile(path.resolve('./static/profile.html'))
})

module.exports = router
