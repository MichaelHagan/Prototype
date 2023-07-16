let express = require('express');
let router = express.Router();
const { authenticate } = require('../utils/authentication');
const {
  getAllServices,
  getAllServicesByJobOwner,
  getServiceById,
  addService,
  editServiceById,
  deleteServiceById,
} = require("../controllers/serviceController");

//Get all services
router.get('/', authenticate, getAllServices);


// Get all services for a given jobOwner
router.get('/jobOwner/:jobOwnerId', authenticate, getAllServicesByJobOwner)

//Get single service
router.get('/:id', authenticate, getServiceById)

//Add service
router.post('/', authenticate, addService)

//Update service
router.put('/:id', authenticate, editServiceById)

//Delete service
router.delete('/:id', authenticate, deleteServiceById)



module.exports = router;