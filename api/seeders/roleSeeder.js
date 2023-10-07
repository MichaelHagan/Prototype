const  Role  = require('../models/roles');

const seed = async () => {
  return [
    {
      role: "admin"
    },
    {
      role: "jobowner"
    },
    {
      role: "customer"
    }
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Role.bulkCreate(await seed());
  }
};
