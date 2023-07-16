const User = require('../models/users');
const bcrypt = require('bcrypt');

const seed = async() =>{
  let hashedPassword = await bcrypt.hash('user', 10);

  return [
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone_number: '1234',
      password: hashedPassword
    },
    {
        name: 'Lorem Ipsum',
        email: 'lorem@example.com',
        phone_number: '1234',
        password: hashedPassword
      }
];
}

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await User.bulkCreate(await seed());
    }
  };