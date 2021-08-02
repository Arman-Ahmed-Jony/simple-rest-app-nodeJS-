const { DataTypes } = require('sequelize')

const Product = (sequelize) =>
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'name not added'
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: 'description not added yet'
    }
  })
module.exports = Product
