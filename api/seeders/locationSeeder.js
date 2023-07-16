const Location = require('../models/locations');

const seed = async () => {
    return [
      {
        location: 'Accra',
      },
      {
        location: 'Kumasi',
      },
      {
        location: 'Takoradi',
      },
      {
        location: 'Cape Coast',
      },
      {
        location: 'Sekondi-Takoradi',
      },
      {
        location: 'Tamale',
      },
      {
        location: 'Sunyani',
      },
      {
        location: 'Ho',
      },
      {
        location: 'Bolgatanga',
      },
      {
        location: 'Koforidua',
      },
    ];
  };
  
  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Location.bulkCreate(await seed());
    }
  };
  