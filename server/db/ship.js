const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchAddress = async()=> {
  const SQL = `
    SELECT *
    FROM address
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createAddress = async(address)=> {
    const SQL = `
      INSERT INTO address 
      (id, name, last_name, _address, phone) 
      VALUES($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), address.name, address.last_name, address._address, address.phone]);
    return response.rows[0];
    
  };
  
  module.exports = {
    createAddress,
    fetchAddress
  };