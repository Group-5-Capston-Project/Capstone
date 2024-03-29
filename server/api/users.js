const {
  fetchUsers,
  updateUser,
  // updateVipUser
} = require('../db/users');
const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');
const { createUser } = require('../db/auth')

app.get('/', async(req, res, next)=> {
  try {
    res.send(await fetchUsers());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/:id', async (req, res, next)=> {
  try {
    const response = await updateUser({ ...req.body, id: req.params.id });
    res.send(response)
  } catch (error) {
    next(error)
  }

})

app.post('/', async(req, res, next) => {
try{
  res.send(await createUser(req.body))
} catch(error){
  next(error)
}
})


module.exports = app; 