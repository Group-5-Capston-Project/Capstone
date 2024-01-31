const client = require('./client')
const path = require('path')
const fs = require('fs')

const {
  fetchProducts,
  createProduct,
  createReview,
  fetchReviews,
  updateProduct,
  createVipProduct
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
  createAddress,
  fetchAddress,
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
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER NOT NULL,
      description TEXT,
      image TEXT,
      is_vip_product BOOLEAN DEFAULT false NOT NULL
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

  const [moe, lucy, ethyl, mark] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false, is_vip: false}),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false, is_vip: false}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true, is_vip: false}),
    createUser({ username: 'mark', password: '1234', is_admin: false, is_vip: true})
  ]);

  
  // general products 
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



  let [bananas, oranges, blackgrapes] = await Promise.all([
    createProduct({ name: 'Banana', price: 20, description: 'Non-GMO Premium Bananas That Will Make You Go Bananas!', image: bananaImage, is_vip_product: true },
        reviews = [{ text: "good banana"}]),
    createProduct({ name: 'Orange', price: 30, description: 'Worth Every Dollar Organic and Sweet Oranges!', image: orangeImage, is_vip_product: true},
        reviews = [{ text: "good orange"}]),
    createProduct({ name: 'Black Grapes', price: 40, description: 'High-Quality Super Expensive Grapes', image: blackgrapesImage, is_vip_product: false },
        reviews = [{ text: "bad grapes"}]),
    createProduct({ name: 'Apple', price: 50, description: 'Apples That Deserve An Applause', image: appleImage, is_vip_product: false },
        reviews = [{ text: "great apple"}]),
    createProduct({ name: 'Cucumber', price: 50, description: 'Fresh Organic Cucumbers From Veggie Tales', image: cucumberImage, is_vip_product: false }),
    createProduct({ name: 'Zucchini Squash', price: 50, description: 'Fresh and Organic Zucchini Squash (Perfect For Spaghetti) ', image: zucchinisquashImage, is_vip_product: false }),
    createProduct({ name: 'Blueberries', price: 50, description: 'Blueberries That Turn Red', image: blueberriesImage , is_vip_product: false }),
    createProduct({ name: 'Russet Potato', price: 50, description: 'const potato = { smilelyFace: (: }', image: russetpotatoImage, is_vip_product: true }),
    createProduct({ name: 'Green Cabbage', price: 50, description: 'Fresh Organic Green Cabbage', image: greencabbageImage, is_vip_product: false }),
    createProduct({ name: 'Carrots', price: 50, description: 'Carrots That Care', image: carrotsImage, is_vip_product: false }),
    createProduct({ name: 'Green Onion', price: 50, description: 'Organic and Fresh Green Onion!', image: greenonionImage, is_vip_product: true }),
    createProduct({ name: 'Tomato', price: 50, description: 'Fresh And Organic Tomatos', image: tomatoImage, is_vip_product: false }),
    createProduct({ name: 'Cilantro', price: 50, description: 'Cilantro (This One Is Not Parsley) ', image: cilantroImage, is_vip_product: false }),
    createProduct({ name: 'Eggplant', price: 50, description: 'Fresh and Organic Eggplants', image: eggplantImage, is_vip_product: false }),
    createProduct({ name: 'Romaine Lettuce', price: 50, description: 'Insane Romaine Lettuce!', image: romainelettuceImage, is_vip_product: true }),
    createProduct({ name: 'Parsley', price: 50, description: 'Fresh Parsley (Actually Parsley)', image: parsleyImage , is_vip_product: false}),
    createProduct({ name: 'Serrano Pepper', price: 50, description: 'Organic and Spicy Serrano Peppers!', image: serranopepperImage , is_vip_product: true}),
    createProduct({ name: 'Strawberries', price: 50, description: 'Strawberries That Will Leave You In Awe ', image: strawberriesImage , is_vip_product: false}),
    createProduct({ name: 'Red Onion', price: 50, description: 'Organic Red Onions ', image: redonionImage , is_vip_product: false}),
    createProduct({ name: 'Kiwi', price: 50, description: 'Fresh and Organic Kiwis ', image: kiwiImage , is_vip_product: false}),
    createProduct({ name: 'Pineapple', price: 50, description: 'Sweet Organic Pineapples', image: pineappleImage , is_vip_product: false}),
    createProduct({ name: 'Raspberries', price: 50, description: 'Organic and Tasty Raspberries ', image: raspberriesImage , is_vip_product: false}),
    createProduct({ name: 'Red Mango', price: 50, description: 'Red Mangos That Are Sweeter Than Other Red Mangos ', image: redmangoImage , is_vip_product: false}),
    createProduct({ name: 'Lemons', price: 50, description: 'Organic Sweet and Sour Lemons!', image: lemonsImage, is_vip_product: true }),

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
  updateProduct,

  fetchAddress,

  createProduct
};
