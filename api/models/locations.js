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

/*
const Sequelize = require('sequelize');
const db = require('../config/database');
const Business = require('./businesses');

const Location = db.define('Location', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  latitude: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      min: -90,
      max: 90,
    },
  },
  longitude: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      min: -180,
      max: 180,
    },
  },
}, {
  tableName: 'locations',
});

// Establish a one-to-many relationship between "Location" and "Business"
Location.hasMany(Business, { foreignKey: 'locationId' });

module.exports = Location;

*/