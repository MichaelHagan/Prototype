const Sequelize = require('sequelize');
const db = require('../config/database');

const image = db.define('Image',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
url:{
type:Sequelize.STRING,
allowNull:false,
},
isMain:{
type:Sequelize.BOOLEAN,
allowNull:false,
defaultValue:false
}
},{
  tableName:'images'  
}
);

module.exports = image;