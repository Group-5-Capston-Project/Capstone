const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;
const bcrypt = require('bcrypt');



const fetchUsers = async()=> {
  const SQL = `
    SELECT *
    FROM users
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createUser = async(user)=> {
  const SQL = `
    INSERT INTO users (id, username, password) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), user.username, user.password]);
  return response.rows[0];
};

const updateUser = async(user) => {
    console.log(user)
    user.password = await bcrypt.hash(user.password, 5);
    const SQL = `
      UPDATE users
      SET username = $1, password = $2, is_admin = $3
      WHERE id = $4
      RETURNING *
  `;
  
  const response = await client.query(SQL, [user.username, user.password, user.is_admin, user.id]);
  console.log(response.rows[0])
  return response.rows[0]
  } 





module.exports = {
  fetchUsers,
  createUser,
  updateUser
};