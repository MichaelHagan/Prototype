const User = require('../models/users');
const bcrypt = require('bcrypt');

const seed = async() =>{
  let hashedPassword = await bcrypt.hash('user', 10);
  let adminHashedPassword = await bcrypt.hash('admin', 10);
  let jobOwnerHashedPassword = await bcrypt.hash('owner', 10);

  return [
    {
      name: 'Administrator',
      email: 'admin',
      phone_number: '1234',
      password: adminHashedPassword,
      RoleId:1
    },
    {
      name: 'Daniel Morris',
      email: 'daniel@example.com',
      phone_number: '1234',
      password: jobOwnerHashedPassword,
      RoleId:2
    },
    {
        name: 'Moris Daniel',
        email: 'moris@example.com',
        phone_number: '1234',
        password: jobOwnerHashedPassword,
        RoleId:2
      },
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone_number: '1234',
      password: hashedPassword,
      RoleId:3
    },
    {
        name: 'Lorem Ipsum',
        email: 'lorem@example.com',
        phone_number: '1234',
        password: hashedPassword,
        RoleId:3
      }
];
}

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await User.bulkCreate(await seed());
    }
  };