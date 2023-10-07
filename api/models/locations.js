const Sequelize = require('sequelize');
const db = require('../config/database');
const business = require('./businesses');

const location = db.define('Location',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
location:{
type:Sequelize.STRING,
allowNull:false,
unique:true
}
},{
  tableName:'locations'  
}
);
location.hasMany(business);


module.exports = location;