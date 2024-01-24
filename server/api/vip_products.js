const {
    fetchVipProducts,
    // updateProduct
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/vip_products', async(req, res, next)=> {
try {
  res.send(await fetchVipProducts());
}
catch(ex){
  next(ex);
}
});

// app.put('/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
// res.send(await updateProduct({id: req.params.id, ...req.body}));
// });


module.exports = app;
