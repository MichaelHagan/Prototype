const Bussiness = require('../models/businesses');

const seed = async () => {
    return [
      {
        name: 'Daniel Hotel',
        description: '5-star fancy hotel',
        available: true,
        services: " ",
        LocationId:1,
        jobOwnerId:1
      },
      {
        name: 'Luxury Resorts',
        description: 'Exquisite beachfront resort',
        available: true,
        services: " ",
        LocationId:2,
        jobOwnerId:2
      },
      {
        name: 'Grand Plaza',
        description: 'Elegant city center hotel',
        available: true,
        services: " ",
        LocationId:3,
        jobOwnerId:1
      },
      {
        name: 'Mountain Lodge',
        description: 'Scenic retreat in the mountains',
        available: true,
        services: " ",
        LocationId:4,
        jobOwnerId:2
      },
      {
        name: 'Seaside Villas',
        description: 'Charming coastal cottages',
        available: true,
        services: " ",
        LocationId:5,
        jobOwnerId:1
      }
    ];
  };
  

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Bussiness.bulkCreate(await seed());
    }
  };
  