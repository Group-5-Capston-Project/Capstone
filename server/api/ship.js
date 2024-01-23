const {
  createAddress,
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');



app.post('/', async(req, res, next) => {
  try{
    res.send(await createAddress(req.body))
  } catch(error){
    next(error)
  }
})


module.exports = app;

