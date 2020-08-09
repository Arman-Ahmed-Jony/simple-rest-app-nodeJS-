const Joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
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
)

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  })
  return Joi.validateAsync(user, schema)
}

exports.User = User
exports.validate = validateUser
