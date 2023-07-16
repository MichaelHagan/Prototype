const Sequelize = require('sequelize');
const db = require('../config/database');
const business = require('./businesses');

const jobOwner = db.define('jobOwner',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
name:{
type:Sequelize.STRING,
allowNull:false
},
email:{
type:Sequelize.STRING
},
phone_number:{
  type:Sequelize.STRING
},
password:{
type:Sequelize.STRING,
allowNull:false
}
},{
  tableName:'jobOwners'  
}
);

jobOwner.hasMany(business);

module.exports = jobOwner;