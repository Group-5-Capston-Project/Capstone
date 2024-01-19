const client = require('./client')
const path = require('path')
const fs = require('fs')

const {
  fetchProducts,
  createProduct,
  createReview,
  fetchReviews,
} = require('./products');

const {
  createUser,
  authenticate,
  findUserByToken,
} = require('./auth');


const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');

const {
  addToWishList,
  fetchWishListItems,
  removeFromWishList,
} = require('./wishlist');

const {
  createAddress
} = require ('./ship')

const loadImage = (filePath) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, filePath)
    fs.readFile(fullPath, 'base64', (err, result) => {
      if(err) {
        reject(err)
      }else{
        resolve(`data:image/png;base64,${result}`)
      }
    })
  })
}

const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS wish_list_items;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS address;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER NOT NULL,
      description TEXT,
      image TEXT
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );
    
    CREATE TABLE address(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(25),
      last_name VARCHAR(25),
      _address VARCHAR(100), 
      phone VARCHAR(20)
    );


      

    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      product_id UUID,
      txt TEXT,
      rating INTEGER NOT NULL
      );

      CREATE TABLE wish_list_items (
        id UUID PRIMARY KEY,
        created_at TIMESTAMP DEFAULT now(),
        user_id UUID REFERENCES users(id) NOT NULL,
        product_id UUID REFERENCES products(id) NOT NULL,
        CONSTRAINT unique_wish_list_item UNIQUE(user_id, product_id)
      );

  `;
  await client.query(SQL);

  const [moe, lucy, ethyl] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false}),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true})
  ]);

  const bananaImage = await loadImage('images/banana.jpeg')
  const orangeImage = await loadImage('images/orange.jpeg')
  const grapeImage = await loadImage('images/grapes.jpeg')

  let [bananas, oranges, grapes] = await Promise.all([
    createProduct({ name: 'bananas', price: 20, description: 'foo description', image: bananaImage },
        reviews = [{ txt: "meh banana", rating: 3 }]),
    createProduct({ name: 'oranges', price: 30, description: 'bar description', image: orangeImage },
        reviews = [{ txt: "good orange", rating: 5 }]),
    createProduct({ name: 'grapes', price: 40, description: 'bazz description' },
        reviews = [{ txt: "bad grapes", rating: 1 }]),
    createProduct({ name: 'apples', price: 50, description: 'quq description' },
        reviews = [{ txt: "great apple", rating: 4 }]),
  ]);

  const [] = await Promise.all([
    createAddress({ name:'ethyl', last_name: 'doe', _address:'404 Not Found Way', phone: '510-333-3333'})
  ]);
  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: bananas.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: oranges.id});
  cart.is_cart = false;
  await updateOrder(cart);
  
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken,
  createAddress,
  seed,
  addToWishList,
  fetchWishListItems,
  removeFromWishList,
  createReview,
  fetchReviews,
  client
};
