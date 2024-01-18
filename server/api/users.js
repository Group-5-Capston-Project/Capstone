const {
    fetchUsers,
    updateUser
  } = require('../db/users');
  const express = require('express');
  const { isLoggedIn } = require('./middleware');
  const app = express.Router();
  
  
  
  app.get('/', async(req, res, next)=> {
    try {
      console.log("Hello World")
      res.send(await fetchUsers());
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.put('/:id', async (req, res, next)=> {
    try {
      console.log(req.body)
      const response = await updateUser({ ...req.body, id: req.params.id });
      res.send(response)
      console.log("response -->", response)
    } catch (error) {
      next(error)
    }

})
  
  
  module.exports = app; 