const Bussiness = require('../models/businesses');

const seed = async () => {
    return [
      {
        name: 'Daniel Rentals',
        description: '5-star rentals',
        available: true,
        LocationId:1,
        jobOwnerId:1
      },
      {
        name: 'Luxury Rentals',
        description: 'Exquisite car rentals',
        available: true,
        LocationId:2,
        jobOwnerId:2
      },
      {
        name: 'Grand Rentals',
        description: 'Elegant car rentals',
        available: true,
        LocationId:3,
        jobOwnerId:1
      },
      {
        name: 'Mountain Rentals',
        description: 'Fast cars',
        available: true,
        LocationId:4,
        jobOwnerId:2
      },
      {
        name: 'Seaside Rentals',
        description: 'Classy cars',
        available: true,
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
  