const { DataTypes } = require('sequelize')

const ProductType = (sequelize) =>
  sequelize.define('productType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Bevarage'
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: 'description not added yet'
    }
  })
module.exports = ProductType
