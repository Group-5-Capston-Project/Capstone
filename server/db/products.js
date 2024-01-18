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
        INSERT INTO reviews (id, product_id, txt, rating)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
  const response = await client.query(SQL, [review.id, review.product_id, review.txt, review.rating]);
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
    INSERT INTO products (id, name, price, description) VALUES($1, $2, $3, $4) RETURNING *
  `;
  const id = uuidv4()
  const response = await client.query(SQL, [ id, product.name, product.price, product.description]);
  if (reviews.length > 0) {
    reviews.forEach(review => {
      createReview({ id: uuidv4(), product_id: id, txt: review.txt, rating: review.rating });
    })
  }
  return response.rows[0];
};

module.exports = {
  fetchProducts,
  createProduct,
  createReview,
  fetchReviews,
};

