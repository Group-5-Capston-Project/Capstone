const {
    fetchWishListItems,
    addToWishList,
    removeFromWishList,
} = require('../db/wishlist');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/:userId', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await fetchWishListItems(req.params.userId));
    }
    catch(ex){
        next(ex);
    }
});

app.post('/add', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await addToWishList(req.body.userId, req.body.productId));
        res.status(201);
    }
    catch(ex){
        next(ex);
    }
});

app.delete('/remove/:userId/:productId', isLoggedIn, async (req, res, next) => {
    try {
        await removeFromWishList(req.params.userId, req.params.productId);
        res.sendStatus(204);
    }
    catch(ex){
        next(ex);
    }
});

module.exports = app;