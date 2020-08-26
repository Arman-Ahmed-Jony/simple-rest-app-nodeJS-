const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next) {
  const token = req.header('x-auth-token')
  if (!token)
    return res.status(401).json({ message: 'access denied. no token provided' })

  try {
    const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'))
    req.user = decodedPayload
    next()
  } catch (error) {
    res.status(400).json({ message: 'invalid token' })
  }
}

module.exports = auth
