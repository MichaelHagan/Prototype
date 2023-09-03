const Order = require('../models/orders');
const Business = require('../models/businesses');
const Car = require('../models/cars');
const { sort } = require('../utils/sortHelper');



const getAllOrders = async (req, res) => {

  try {

    let filter = req.query.id;

    Order.findAll()
      .then(orders => {
        let sortedOrders;
        if (filter) {
          // Apply the filter logic
          sortedOrders = orders.filter((order) =>
          order.id.toString().includes(filter) // Adjust the filtering condition based on your requirements
          );
        } else { sortedOrders = orders }
        sortedOrders = sort(req, sortedOrders);
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${sortedOrders.length}`);
        res.send(sortedOrders);
      })
      .catch(err => {
        console.log(err)
        res.send("Error")
      })
  } catch (e) {
    res.send(e)
  }
};

const getAllOrdersByCarId = async (id) =>{
  let orders = await Order.findAll({
    where: { CarId:id},
  });
  return orders;
}

const getAllOrdersByJobOwner = async (req, res) => {

  
  try {
    
    let filter = req.query.id;
    let {
      id
    } = req.payload;

    let businesses = await Business.findAll({
      where: { jobOwnerId: id },
    });

    let cars = await Car.findAll({
      where: { BusinessId: businesses.map(business => business.id) },
    });
    
    let orders = await Order.findAll({
      where: { CarId: cars.map(car => car.id) },
    });

    let sortedOrders;
    if (filter) {
      // Apply the filter logic
      sortedOrders = orders.filter((order) =>
        order.id.toString().includes(filter) // Adjust the filtering condition based on your requirements
      );
    } else { sortedOrders = orders }
    sortedOrders = sort(req, sortedOrders);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${sortedOrders.length}`);
    res.send(sortedOrders);
    
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const getOrderById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Order.findOne({
      where: { id: id },
    });
    res.json(row);
  } catch (e) {
    res.send(e)
  }

};

const addOrder = async (req, res) => {

  try {

    let {
      details,
      customer_name,
      customer_number,
      total_price,
      order_state,
      payment,
      pickup_time,
      dropoff_time,
      UserId,
      CarId
    } = req.body;

    Order.create({
        details,
        customer_name,
        customer_number,
        total_price,
        order_state,
        payment,
        pickup_time,
        dropoff_time,
        UserId,
        CarId
    }).then(order => {
      res.send(order);
    }
    ).catch(err => {
      res.send(err.errors[0].message);
    })

  } catch (e) {
    res.status(500).send();
  }


};

const editOrderById = async (req, res) => {

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
        "details",
        "customer_name",
        "customer_number",
        "total_price",
        "order_state",
        "payment",
        "pickup_time",
        "dropoff_time",
        "UserId",
        "CarId"
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (const element of collumns) {

      if (req.body.hasOwnProperty(element)) {
        check = false;
        let key = element;
        const value = req.body[key];

          await Order.update(
            { [key]: value }, 	// attribute
            { where: { id: id } }			// condition
          );

        output_str += `Order ${key} was updated with value ${value}\n`;
      }
    }

    if (check) {
      res.send("Attribute passed does not exist or null attribute passed")
    } else {
      console.log(output_str);
      res.json(req.body);
    }

  } catch (e) {
    res.send(e.message)
  }

};

const deleteOrderById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Order.findOne({
      where: { id: id },
    });

    if (row) {
      await row.destroy(); // deletes the row
      res.json(row)
      console.log(`Entry for ${row.name} deleted succesfully.`);
    } else {
      res.send('Order does not exist.')
    }
  } catch (e) {
    res.send(e)
  }
};


module.exports = {
  getAllOrders,
  getAllOrdersByCarId,
  getAllOrdersByJobOwner,
  getOrderById,
  addOrder,
  editOrderById,
  deleteOrderById
};