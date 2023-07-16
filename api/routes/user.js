const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const {
    getAllUsers,
    getUserById,
    addUser,
    editUserById,
    deleteUserById,
    userLogin
  } = require("../controllers/userController")

  //Get all Users
  router.get('/', authenticate, getAllUsers );
  
  //Get single user
  router.get('/:id', authenticate, getUserById )
  
  //Add user
  router.post('/', authenticate, addUser )
  
  //User login
  router.post('/login',userLogin )
  
  //Update user
  router.put('/:id', authenticate, editUserById)
  
  //Delete user
  router.delete('/:id',authenticate, deleteUserById)
  
  
  module.exports = router;