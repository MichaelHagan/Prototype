const Car = require('../models/cars');

const seed = async () => {
    const maxBusinessId = 5;
    const seedData = [];
  
    for (let i = 1; i <= 5; i++) {
      seedData.push({
        name: `Toyota Camry ${i}`,
        description: 'Very nice Car',
        price: '100',
        imageUrl:'image',
        available: true,
        BusinessId: Math.floor(Math.random() * maxBusinessId) + 1,
      });
    }
  
    return seedData;
  };
  

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Car.bulkCreate(await seed());
    }
  };