const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const {
    getAllJobOwners,
    getJobOwnerById,
    addJobOwner,
    editJobOwnerById,
    deleteJobOwnerById,
    jobOwnerLogin
  } = require("../controllers/jobOwnerController")

  //Get all JobOwners
  router.get('/', authenticate, getAllJobOwners );
  
  //Get single jobOwner
  router.get('/:id', authenticate, getJobOwnerById )
  
  //Add jobOwner
  router.post('/', authenticate, addJobOwner )
  
  //JobOwner login
  router.post('/login',jobOwnerLogin )
  
  //Update jobOwner
  router.put('/:id', authenticate, editJobOwnerById)
  
  //Delete jobOwner
  router.delete('/:id',authenticate, deleteJobOwnerById)
  
  
  module.exports = router;