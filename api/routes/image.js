let express = require('express');
let router = express.Router();
const { authenticate } = require('../utils/authentication');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });
const {
  getAllImages,
  getAllImagesByJobOwner,
  getImageById,
  addImage,
  editImageById,
  deleteImageById
} = require("../controllers/imageController");

//Get all images
router.get('/', authenticate, getAllImages);


// Get all images for a given jobOwner
router.get('/jobOwner', authenticate, getAllImagesByJobOwner)

//Get single image
router.get('/:id', authenticate, getImageById)

//Add image
router.post('/', authenticate, upload.single('image'), addImage)

//Update image
router.put('/:id', authenticate, upload.single('image'), editImageById)

//Delete image
router.delete('/:id', authenticate, deleteImageById)



module.exports = router;