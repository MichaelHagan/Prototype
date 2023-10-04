require('dotenv').config();
const dbName = process.env.DATABASE_NAME;
const pgtools = require('pgtools');

const Bussiness = require('../models/businesses');
const Location = require('../models/locations');
const Order = require('../models/orders');
const Car = require('../models/cars');
const User = require('../models/users');
const Role = require('../models/roles');

const businessSeeder = require('../seeders/bussinessSeeder');
const locationSeeder = require('../seeders/locationSeeder');
const orderSeeder = require('../seeders/orderSeeder');
const carSeeder = require('../seeders/carSeeder');
const userSeeder = require('../seeders/userSeeder');
const roleSeeder = require('../seeders/roleSeeder');

const dbConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  host: process.env.DATABASE_HOST
};


const initializeDatabase = async () => {
  try {
    // Create database if not present
    await pgtools.createdb(dbConfig, dbName);
    console.log(`Database ${dbName} created`);

  } catch (error) {
    if (error.message === "Attempted to create a duplicate database.") {
      console.log("Database Already Exists");
    } else {
      console.error('An error occurred:', error);
      throw error;
    }
  }
}

const runSeeders = async() =>{
 
     //Check user table, if empty, run seeders
     try {
      let countResponse = await User.count();
      if(countResponse === 0){
    // Run seeders sequentially
    await roleSeeder.up(null, Role.sequelize);
    await userSeeder.up(null, User.sequelize);
    await locationSeeder.up(null, Location.sequelize);
    await businessSeeder.up(null, Bussiness.sequelize);
    await carSeeder.up(null, Car.sequelize);
    await orderSeeder.up(null, Order.sequelize);

    console.log('Seeders completed successfully');
      }
  } catch (error) {
    console.error('Error running seeders:', error);
  }

}

module.exports = {
  initializeDatabase,
  runSeeders
}