const Order = require('../models/orders');
const User = require('../models/users');
const { add, sub } = require('date-fns'); // Import date-fns functions for date manipulation

const seed = async () => {
  const orderStates = ["New", "Pending", "Approved"];
  const maxCarId = 5;
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

    // Generate random pickup and drop-off times within a suitable range
    const currentTime = new Date();
    const pickupTime = add(currentTime, { days: i }); // Pickup time is incremented by days
    const dropoffTime = add(pickupTime, { hours: 4 }); // Drop-off time is 4 hours after pickup

    seedData.push({
      details: `Toyota Camry`,
      customer_name: user.name,
      customer_number: user.phone_number,
      total_price: 500 * i,
      order_state: orderStates[i % 3],
      payment: false,
      CarId: Math.floor(Math.random() * maxCarId) + 1,
      UserId: UserId,
      pickup_time: pickupTime,
      dropoff_time: dropoffTime,
    });
  }

  return seedData;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Order.bulkCreate(await seed());
  },
};
