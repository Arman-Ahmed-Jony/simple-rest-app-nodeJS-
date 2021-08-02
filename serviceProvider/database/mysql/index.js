const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('node_workshop', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})
require('../../../models/product')(sequelize)

sequelize.sync()

module.exports = sequelize
