const client = require('./client');
const { v4 } = require('uuid');
const uuid4 = v4;

const addToWishList = async (userId, productId) => {
  console.log(`db/addToWishList ${userId} ${productId}`)
    const SQL = `
    INSERT INTO wish_list_items (id, user_id, product_id)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id) DO NOTHING
    RETURNING *;
  `;
  const result = await client.query(SQL, [uuid4(), userId, productId]);
  // console.log(`db/addToWishList result=${JSON.stringify(result.rows[0])}`)
  return result.rows[0];
};


const fetchWishListItems = async (userId) => {
    const SQL = `
      SELECT * FROM wish_list_items
      WHERE user_id = $1;
    `;
    const result = await client.query(SQL, [userId]);
    return result.rows;
  };

  
  const removeFromWishList = async (userId, productId) => {
      console.log(`removeFromWishList userId=${userId} productId=${productId}`)
    const SQL = `
      DELETE FROM wish_list_items
      WHERE user_id = $1 AND product_id = $2
      RETURNING *;
    `;
    const result = await client.query(SQL, [userId, productId]);
    return result.rows[0];
  };
  


module.exports = {
    addToWishList,
    fetchWishListItems,
    removeFromWishList,

};
