const Sequelize = require('sequelize')

const sequelize = new Sequelize('node','root','mysql_pass',{
    dialect:'mysql',
    host:'localhost'
})

module.exports= sequelize