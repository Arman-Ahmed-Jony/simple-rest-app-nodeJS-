const express = require('express')
const { User } = require('../models/user')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user)
      return res.status(400).json({ message: 'User already registered' })

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

module.exports = router
