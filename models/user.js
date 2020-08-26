const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 50
  },
  email: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 80,
    unique: true
  },
  password: {
    required: true,
    minlength: 5,
    type: String,
    maxlength: 1024
  }
})
userSchema.methods.generateToken = () => {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.jwtPrivateKey
  )
}
const User = mongoose.model('User', userSchema)

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  })
  return Joi.attempt(user, schema)
}

exports.User = User
exports.validate = validateUser
