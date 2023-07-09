const Sequelize = require('sequelize');
const db = require('../config/database');
const order = require('./orders');

const service = db.define('Service',{
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
price:{
type:Sequelize.DOUBLE,
allowNull:false
},
available:{
type:Sequelize.BOOLEAN,
allowNull:false,
defaultValue: true
},
category:{
type:Sequelize.STRING,
allowNull:false
}
},{
  tableName:'services'  
}
);

service.HasMany(order);

module.exports = service;