const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchProducts = async()=> {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createReview = async (review) => {
  const SQL = `
        INSERT INTO reviews (id, product_id, text)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  console.log(`db/createReview ${JSON.stringify(review)}`)
  const response = await client.query(SQL, [uuidv4(), review.product_id, review.text]);
  return response.rows[0];
};

const fetchReviews = async () => {
  const SQL = `
        SELECT *
        FROM reviews
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async(product, reviews=[])=> {
  const SQL = `
    INSERT INTO products (id, name, price, description, image) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const id = uuidv4()
  const response = await client.query(SQL, [ id, product.name, product.price, product.description, product.image]);
  if (reviews.length > 0) {
    reviews.forEach(review => {
      createReview({ id: uuidv4(), product_id: id, text: review.text });
    })
  }
  return response.rows[0];
};

//create user here 

module.exports = {
  fetchProducts,
  createProduct,
  createReview,
  fetchReviews,
};
