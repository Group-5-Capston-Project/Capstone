const {
    fetchReviews,
  } = require('../db/products');

  const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');


  app.get('/reviews', async (req, res, next) => {
    try {
  
      res.send(await fetchReviews());
    }
    catch (ex) {
      next(ex);
    }
  });


  module.exports = app;