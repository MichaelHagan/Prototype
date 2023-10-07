const Sequelize = require('sequelize');
const db = require('../config/database');
const user = require('../models/users')

const role = db.define('Role',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
role:{
type: Sequelize.STRING,
allowNull: false,
unique: true,
}
},{
  tableName:'roles'  
}
);

role.hasMany(user);

module.exports = role;