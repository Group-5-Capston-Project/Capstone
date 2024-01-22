const {
  createAddress,
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/ship', async(req,res,next) => {
  console.log("hello world")
  res.send("get all addresses")
})

// app.post('/ship', async(req,res,next) => {
//     console.log(req.body)

//     res.send("create address")
//     try{
//        const SQL = `
//            INSERT INTO address(name, last_name, _address, phone)
//            VALUES()     
//        `
//     } catch (error) {
//         next(error)
//     }
// })



module.exports = app;

