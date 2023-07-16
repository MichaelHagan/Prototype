require('dotenv').config();
const dbName = process.env.DATABASE_NAME;
const pgtools = require('pgtools');

const Admin = require('../models/admins');
const Bussiness = require('../models/businesses');
const JobOwner = require('../models/jobOwners');
const Location = require('../models/locations');
const Order = require('../models/orders');
const Service = require('../models/services');
const User = require('../models/users');

const adminSeeder = require('../seeders/adminSeeder');
const businessSeeder = require('../seeders/bussinessSeeder');
const jobOwnerSeeder = require('../seeders/jobOwnerSeeder');
const locationSeeder = require('../seeders/locationSeeder');
const orderSeeder = require('../seeders/orderSeeder');
const serviceSeeder = require('../seeders/serviceSeeder');
const userSeeder = require('../seeders/userSeeder');

const dbConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  host: '127.0.0.1'
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
 
  try {
    // Run seeders sequentially
    await adminSeeder.up(null, Admin.sequelize);
    await businessSeeder.up(null, Bussiness.sequelize);
    await jobOwnerSeeder.up(null, JobOwner.sequelize);
    await locationSeeder.up(null, Location.sequelize);
    await orderSeeder.up(null, Order.sequelize);
    await serviceSeeder.up(null, Service.sequelize);
    await userSeeder.up(null, User.sequelize);

    console.log('Seeders completed successfully');
  } catch (error) {
    console.error('Error running seeders:', error);
  }

}

module.exports = {
  initializeDatabase,
  runSeeders
}