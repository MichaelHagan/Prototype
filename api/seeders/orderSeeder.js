const Order = require('../models/orders');

const seed = async () => {
    const orderStates = ["New", "Pending", "Approved"];
    const maxServiceId = 5;
    const seedData = [];
  
    for (let i = 1; i <= 5; i++) {
      seedData.push({
        details: `${i} deluxe bedroom`,
        customer_name: `Customer ${i}`,
        customer_number: `${i}234`,
        total_price: 500 * i,
        order_state: orderStates[i % 3],
        payment: false,
        serviceId: Math.floor(Math.random() * maxServiceId) + 1,
        userId: Math.floor(Math.random() * 2) + 1
      });
    }
  
    return seedData;
  };
  

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Order.bulkCreate(await seed());
    }
  };