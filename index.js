require('dotenv').config() // this line adds .env power :p
const helmet = require('helmet')
const express = require('express')
const path = require('path')
const http = require('http')

const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const mongoose = require('./serviceProvider/database/mongoose/init')
const sequelize = require('./serviceProvider/database/mysql')

app.use(express.json())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'static')))
app.set('view engine', 'pug')

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
})

/**
 * jwt private key test, wheter it's available in env
 */
if (!process.env.jwtPrivateKey) {
  console.log('FATAL: Json web token is not defined ')
  process.exit(1)
}

/**
 * database connetion test mongoose
 */
const db = mongoose.connection
db.on('error', (error) => console.error(`[application] ${error}`))
db.once('open', () => console.log('[application] connected to database'))

/**
 * database connection test for mysql
 */

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => console.log(err))
//---------

io.on('connection', (socket) => {
  console.log(`new socket handshak [socket id]:${socket.id}`)
  socket.emit('custom-event', 'greetings')
  socket.on('test', (message) => {
    console.log('called')
    console.log(message)
  })
})

/**
 * providing routes to the application
 */
require('./serviceProvider/routes')(app)

const SERVER_PORT = process.env.PORT || 5000
server.listen(SERVER_PORT, () =>
  console.log(`[application] server created in port ${SERVER_PORT}... `)
)
