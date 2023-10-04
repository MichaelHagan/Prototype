let express = require('express');
let router = express.Router();
const { authenticate } = require('../utils/authentication');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });
const {
  getAllCars,
  getAllApprovedCars,
  getAllCarsByJobOwner,
  getCarById,
  addCar,
  editCarById,
  deleteCarById
} = require("../controllers/carController");

//Get all cars
router.get('/', getAllCars);

router.get('/approved',authenticate, getAllApprovedCars);

// Get all cars for a given jobOwner
router.get('/jobOwner', authenticate, getAllCarsByJobOwner)

//Get single car
router.get('/:id', authenticate, getCarById)

//Add car
router.post('/', authenticate, upload.array('images',12), addCar);

//Update car
router.put('/:id', authenticate, upload.single('image'), editCarById)

//Delete car
router.delete('/:id', authenticate, deleteCarById)



module.exports = router;