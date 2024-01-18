const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const createAddress = async(address)=> {
    const SQL = `
      INSERT INTO shipping (id, name, last_name, _address, phone) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), address.name, address.last_name, address._address, address.phone]);
    return response.rows[0];
  };
  
  module.exports = {
    createAddress
  };