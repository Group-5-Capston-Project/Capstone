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
    INSERT INTO products (id, name, price, description, image) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name, product.price, product.description, product.image]);
  return response.rows[0];
};

const updateProduct = async(product) => {
  const SQL = `
    UPDATE products
    SET name = $1, image = $2
    WHERE id = $3
    RETURNING *
  `
  const response = await client.query(SQL, [product.name, product.image, product.id])
  return response.rows[0]
}

//create user here 

module.exports = {
  fetchProducts,
  createProduct,
  createReview,
  fetchReviews,
  updateProduct
};
