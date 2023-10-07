const Sequelize = require('sequelize');
const db = require('../config/database');
const order = require('./orders');
const image = require('./images')

const car = db.define('Car',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
name:{
type:Sequelize.STRING,
allowNull:false,
},
description:{
type:Sequelize.STRING,
allowNull:false
},
price:{
type:Sequelize.DOUBLE,
allowNull:false
},
imageUrl:{
  type:Sequelize.STRING,
  allowNull:false
},
available:{
type:Sequelize.BOOLEAN,
allowNull:false,
defaultValue: true
},
approved:{
  type:Sequelize.BOOLEAN,
  allowNull:false,
  defaultValue: false
}
},{
  tableName:'cars'  
}
);

car.hasMany(order);
car.hasMany(image);

module.exports = car;