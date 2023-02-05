const Sequelize = require('sequelize')
const sequelize = require('../util/database')


const CartItem = sequelize.define('cartItem',{
  id:{
    type:Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
})

module.exports = CartItem