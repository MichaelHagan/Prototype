const Order = require('../models/orders');
const User = require('../models/users');

const seed = async () => {
    const orderStates = ["New", "Pending", "Approved"];
    const maxServiceId = 5;
    const seedData = [];
    const users = await User.findAll();
    const userNumber = users.length;
    let UserId;
    let user;

    for (let i = 1; i <= 5; i++) {
      UserId = Math.floor(Math.random() * userNumber) + 1;
      user = await User.findOne({
        where: { id: UserId },
      });
      seedData.push({
        details: `${i} deluxe bedroom`,
        customer_name: user.name,
        customer_number: user.phone_number,
        total_price: 500 * i,
        order_state: orderStates[i % 3],
        payment: false,
        ServiceId: Math.floor(Math.random() * maxServiceId) + 1,
        UserId: UserId
      });
    }
  
    return seedData;
  };
  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Order.bulkCreate(await seed());
    }
  };