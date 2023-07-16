let express = require('express');
let router = express.Router();
const { authenticate } = require('../utils/authentication');
const {
  getAllBusinesses,
  getAllBusinessesByJobOwner,
  getBusinessById,
  addBusiness,
  editBusinessById,
  deleteBusinessById,
} = require("../controllers/businessController");

//Get all businesses
router.get('/', authenticate, getAllBusinesses);


// Get all businesses for a given jobOwner
router.get('/jobOwner/:jobOwnerId', authenticate, getAllBusinessesByJobOwner)

//Get single business
router.get('/:id', authenticate, getBusinessById)

//Add business
router.post('/', authenticate, addBusiness)

//Update business
router.put('/:id', authenticate, editBusinessById)

//Delete business
router.delete('/:id', authenticate, deleteBusinessById)



module.exports = router;