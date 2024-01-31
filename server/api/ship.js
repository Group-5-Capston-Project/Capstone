const {
  createAddress,
  fetchAddress,
  
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async (req, res, next) => {
  try {
    res.send(await fetchAddress());
  }
  catch (ex) {
    next(ex);
  }
});



app.post('/', async(req, res, next) => {
  try{
    res.send(await createAddress(req.body))
  } catch(error){
    next(error)
  }
})


module.exports = app;

