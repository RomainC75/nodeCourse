const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Product = sequelize.define('product',{
  id:{
    type:Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price:{
    type: Sequelize.DataTypes.DOUBLE,
    allowNull: false
  },
  imageUrl:{
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.DataTypes.STRING,
    allowNull: true
  },
  // userId:{
  //   type: Sequelize.DataTypes.STRING,
  //   // allowNull: true
  // }
})

module.exports=Product
