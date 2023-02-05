const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name:{
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }
});


module.exports = User