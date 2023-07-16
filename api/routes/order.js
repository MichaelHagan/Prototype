let express = require('express');
let router = express.Router();
const { authenticate } = require('../utils/authentication');
const {
  getAllOrders,
  getAllOrdersByJobOwner,
  getOrderById,
  addOrder,
  editOrderById,
  deleteOrderById,
} = require("../controllers/orderController");

//Get all orders
router.get('/', authenticate, getAllOrders);


// Get all orders for a given jobOwner
router.get('/jobOwner/:jobOwnerId', authenticate, getAllOrdersByJobOwner)

//Get single order
router.get('/:id', authenticate, getOrderById)

//Add order
router.post('/', authenticate, addOrder)

//Update order
router.put('/:id', authenticate, editOrderById)

//Delete order
router.delete('/:id', authenticate, deleteOrderById)



module.exports = router;