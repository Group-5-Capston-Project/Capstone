const {
  fetchProducts,
  updateProduct,
  createProduct
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/vip_products', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
  res.send(await updateProduct({id: req.params.id, ...req.body}));
});


app.post('/add', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
    res.send(await createProduct(req.body));
  }
  catch(ex){
    next(ex);
  }
});


module.exports = app;
