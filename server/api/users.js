const {
    fetchUsers
  } = require('../db/users');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
const { createUser } = require('../db/auth');
  
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
  
  app.post('/', async(req, res, next) => {
    try{
      res.send(await createUser(req.body))
    } catch(error){
      next(error)
    }
  })
  
  module.exports = app;