const Sequelize = require('sequelize');
const db = require('../config/database');
const service = require('./services');

const business = db.define('Business',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
name:{
type:Sequelize.STRING,
allowNull:false,
unique:true
},
description:{
type:Sequelize.STRING,
allowNull:false
},
available:{
type:Sequelize.BOOLEAN,
allowNull:false,
defaultValue: true
},
services:{
type:Sequelize.STRING,
allowNull:true
}
},{
  tableName:'businesses'  
}
);

business.hasMany(service);

module.exports = business;