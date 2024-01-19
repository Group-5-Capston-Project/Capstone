const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');
// body parser
app.use(express.json())

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));
app.use('/reviews', require('./reviews'));
app.use('/wishlist', require('./wishlist'));



module.exports = app;
