const Bussiness = require('../models/businesses');

const seed = async () => {
    return [
      {
        name: 'Daniel Hotel',
        description: '5-star fancy hotel',
        available: true,
        services: " ",
        locationId:1
      },
      {
        name: 'Luxury Resorts',
        description: 'Exquisite beachfront resort',
        available: true,
        services: " ",
        locationId:2
      },
      {
        name: 'Grand Plaza',
        description: 'Elegant city center hotel',
        available: true,
        services: " ",
        locationId:3
      },
      {
        name: 'Mountain Lodge',
        description: 'Scenic retreat in the mountains',
        available: true,
        services: " ",
        locationId:4
      },
      {
        name: 'Seaside Villas',
        description: 'Charming coastal cottages',
        available: true,
        services: " ",
        locationId:5
      }
    ];
  };
  

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Bussiness.bulkCreate(await seed());
    }
  };
  