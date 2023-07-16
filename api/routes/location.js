let express = require('express');
let router = express.Router();
const { authenticate } = require('../utils/authentication');
const {
  getAllLocations,
  getLocationById,
  addLocation,
  editLocationById,
  deleteLocationById,
} = require("../controllers/locationController");

//Get all location
router.get('/', authenticate, getAllLocations);

//Get single location
router.get('/:id', authenticate, getLocationById)

//Add location
router.post('/', authenticate, addLocation)

//Update location
router.put('/:id', authenticate, editLocationById)

//Delete location
router.delete('/:id', authenticate, deleteLocationById)



module.exports = router;