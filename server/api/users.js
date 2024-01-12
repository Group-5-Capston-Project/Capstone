const {
    fetchUsers,
  } = require('../db/users');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', async(req, res, next)=> {
    try {
      console.log("Hello World")
      res.send(await fetchUsers());
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.put('/users/:id', isLoggedIn, isAdmin, (req, res, next)=> {
    res.send('hello world');
  });
  
  
  module.exports = app;