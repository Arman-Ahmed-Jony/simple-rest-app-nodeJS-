require('dotenv').config() // this line adds .env power :p
const helmet = require('helmet')
const config = require('config')
const express = require('express')
const mongoose = require('mongoose')

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL: Json web token is not defined ')
  process.exit(1)
}
const app = express()

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())
app.use(helmet())
const subscribersRouter = require('./routes/subscribers')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/subscribers', subscribersRouter)
app.listen(3000, () => console.log('server created'))
