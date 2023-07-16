const Service = require('../models/services');

const seed = async () => {
    const categories = [
      "hospitality",
      "hospitality",
      "hospitality",
      "hospitality",
      "hospitality",
      "other",
      "other",
      "other",
      "other",
      "other",
    ];
    const maxBusinessId = 5;
    const seedData = [];
  
    for (let i = 1; i <= 5; i++) {
      seedData.push({
        name: `Deluxe Room ${i}`,
        description: 'Very nice rooms',
        price: '1000',
        available: true,
        category: categories[i % 5],
        businessId: Math.floor(Math.random() * maxBusinessId) + 1,
      });
    }
  
    return seedData;
  };
  

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Service.bulkCreate(await seed());
    }
  };