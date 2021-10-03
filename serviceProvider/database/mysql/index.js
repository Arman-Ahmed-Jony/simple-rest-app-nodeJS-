const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('node_workshop', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})
const product = require('../../../models/product')(sequelize)
const productType = require('../../../models/productType')(sequelize)

productType.belongsTo(product)
product.hasMany(productType)
// product.belongsToMany(productType, { through: 'product_productType' })
sequelize.sync({ force: true })

module.exports = sequelize
