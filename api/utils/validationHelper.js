const { parseISO, isBefore } = require('date-fns');
const { getAllOrdersByCarId } = require('../controllers/orderController'); 

export const validateOrderTime= async(order)=>{
  const { pickup_time, CarId, dropoff_time } = order;

  // Convert pickup_time and dropoff_time strings to Date objects
  const pickupTimeDate = parseISO(pickup_time);
  const dropoffTimeDate = parseISO(dropoff_time);

  // Get the current time as a Date object
  const currentDateTime = new Date();

  // Check if the pickup time is in the past
  if (isBefore(pickupTimeDate, currentDateTime)) {
    return {
      result: false,
      message: 'Cannot place an order for a past time.',
    };
  }

  // Check if the dropoff_time is before the pickup_time
  if (isBefore(dropoffTimeDate, pickupTimeDate)) {
    return {
      result: false,
      message: 'Drop-off time must be after the pickup time.',
    };
  }

  // Retrieve existing orders for the given car
  const existingOrders = await getAllOrdersByCarId(CarId); // Replace with your function to get car orders

  // Check for clashes with existing orders
  for (const existingOrder of existingOrders) {
    const existingOrderPickupTime = parseISO(existingOrder.pickup_time);
    const existingOrderDropoffTime = parseISO(existingOrder.dropoff_time);

    if (
      isBefore(pickupTimeDate, existingOrderDropoffTime) &&
      isBefore(existingOrderPickupTime, dropoffTimeDate)
    ) {
      return {
        result: false,
        message: 'Order clashes with an existing order.',
      };
    }
  }

  return {
    result: true,
    message: 'Success',
  };
}