const Bussiness = require('../models/businesses');

const seed = async () => {
    return [
      {
        name: 'Daniel Rentals',
        description: '5-star rentals',
        available: true,
        LocationId:1,
        UserId:2
      },
      {
        name: 'Luxury Rentals',
        description: 'Exquisite car rentals',
        available: true,
        LocationId:2,
        UserId:3
      },
      {
        name: 'Grand Rentals',
        description: 'Elegant car rentals',
        available: true,
        LocationId:3,
        UserId:2
      },
      {
        name: 'Mountain Rentals',
        description: 'Fast cars',
        available: true,
        LocationId:4,
        UserId:3
      },
      {
        name: 'Seaside Rentals',
        description: 'Classy cars',
        available: true,
        LocationId:5,
        UserId:2
      }
    ];
  };
  

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Bussiness.bulkCreate(await seed());
    }
  };
  