const JobOwner = require('../models/jobOwners');
const bcrypt = require('bcrypt');

const seed = async() =>{
  let hashedPassword = await bcrypt.hash('owner', 10);

  return [
    {
      name: 'Daniel Morris',
      email: 'daniel@example.com',
      phone_number: '1234',
      password: hashedPassword
    },
    {
        name: 'Moris Daniel',
        email: 'moris@example.com',
        phone_number: '1234',
        password: hashedPassword
      }
];
}

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await JobOwner.bulkCreate(await seed());
    }
  };