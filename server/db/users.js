const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

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


module.exports = {
  fetchUsers,
  createUser
};