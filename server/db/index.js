const client = require('./client')
const path = require('path')
const fs = require('fs')

const {
  fetchProducts,
  createProduct,
  createReview,
  fetchReviews,
  updateProduct
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
      text TEXT
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

  const bananaImage = await loadImage('images/banana.jpg')
  const orangeImage = await loadImage('images/orange.jpg')
  const blackgrapesImage = await loadImage('images/blackgrapes.jpg')
  const appleImage = await loadImage('images/apple.jpg')
  const cucumberImage = await loadImage('images/cucumber.jpg')
  const zucchinisquashImage = await loadImage('images/zucchinisquash.jpg')
  const blueberriesImage = await loadImage('images/blueberries.jpg')
  const russetpotatoImage = await loadImage('images/russetpotato.jpg')
  const greencabbageImage = await loadImage('images/greencabbage.jpg')
  const carrotsImage = await loadImage('images/carrots.jpg')
  const greenonionImage = await loadImage('images/greenonion.jpg')
  const tomatoImage = await loadImage('images/tomato.jpg')
  const cilantroImage = await loadImage('images/cilantro.jpg')
  const eggplantImage = await loadImage('images/eggplant.jpg')
  const romainelettuceImage = await loadImage('images/romainelettuce.jpg')
  const parsleyImage = await loadImage('images/parsley.jpg')
  const serranopepperImage = await loadImage('images/serranopepper.jpg')
  const strawberriesImage = await loadImage('images/strawberries.jpg')
  const redonionImage = await loadImage('images/redonion.jpg')
  const kiwiImage = await loadImage('images/kiwi.jpg')
  const pineappleImage = await loadImage('images/pineapple.jpg')
  const raspberriesImage = await loadImage('images/raspberries.jpg')
  const redmangoImage = await loadImage('images/redmango.jpg')
  const lemonsImage = await loadImage('images/lemons.jpg')
  const grapeImage = await loadImage('images/grapes.jpeg')


  let [bananas, oranges, grapes] = await Promise.all([
    createProduct({ name: 'Banana', price: 20, description: 'product description', image: bananaImage },
        reviews = [{ text: "good banana"}]),
    createProduct({ name: 'Orange', price: 30, description: 'product description', image: orangeImage},
        reviews = [{ text: "good orange"}]),
    createProduct({ name: 'Black Grapes', price: 40, description: 'product description', image: blackgrapesImage },
        reviews = [{ text: "bad grapes"}]),
    createProduct({ name: 'Apple', price: 50, description: 'product description', image: appleImage },
        reviews = [{ text: "great apple"}]),

    createProduct({ name: 'Cucumber', price: 50, description: 'product description', image: cucumberImage }),
    createProduct({ name: 'Zucchini Squash', price: 50, description: 'product description', image: zucchinisquashImage }),
    createProduct({ name: 'Blueberries', price: 50, description: 'product description', image: blueberriesImage }),
    createProduct({ name: 'Russet Potato', price: 50, description: 'product description', image: russetpotatoImage }),
    createProduct({ name: 'Green Cabbage', price: 50, description: 'product description', image: greencabbageImage }),
    createProduct({ name: 'Carrots', price: 50, description: 'product description', image: carrotsImage }),
    createProduct({ name: 'Green Onion', price: 50, description: 'product description', image: greenonionImage }),

    createProduct({ name: 'Tomato', price: 50, description: 'product description', image: tomatoImage }),
    createProduct({ name: 'Cilantro', price: 50, description: 'product description', image: cilantroImage }),
    createProduct({ name: 'Eggplant', price: 50, description: 'product description', image: eggplantImage }),
    createProduct({ name: 'Romaine Lettuce', price: 50, description: 'product description', image: romainelettuceImage }),
    createProduct({ name: 'Parsley', price: 50, description: 'product description', image: parsleyImage }),
    createProduct({ name: 'Serrano Pepper', price: 50, description: 'product description', image: serranopepperImage }),
    createProduct({ name: 'Strawberries', price: 50, description: 'product description', image: strawberriesImage }),
    createProduct({ name: 'Red Onion', price: 50, description: 'product description', image: redonionImage }),
    createProduct({ name: 'Kiwi', price: 50, description: 'product description', image: kiwiImage }),
    createProduct({ name: 'Pineapple', price: 50, description: 'product description', image: pineappleImage }),
    createProduct({ name: 'Raspberries', price: 50, description: 'product description', image: raspberriesImage }),
    createProduct({ name: 'Red Mango', price: 50, description: 'product description', image: redmangoImage }),
    createProduct({ name: 'Lemons', price: 50, description: 'product description', image: lemonsImage }),

  ]);

  grapes = await updateProduct({...grapes, image: grapeImage})

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
  client,
  updateProduct
};
