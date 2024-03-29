import axios from 'axios';

const getHeaders = ()=> {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchUsers = async(setUsers)=> {
  const {data} = await axios.get('/api/users');
  setUsers(data);
};



  const updateUser = async({user, users, setUsers, auth}) => {
        const response = await axios.put(`/api/users/${user.id}`, {
        username: user.username,
        password: user.password
      }, getHeaders());
      setUsers(users.map( user => user.id == response.data.id ? response.data: user))
  }


const createUser = async({user, setUsers})=> {
  const response = await axios.post('/api/users', {
    username: user.username,
    password: user.password
  }, getHeaders());
  setUsers([...user, response.data]);
};

const createAddress = async(setAddress)=> {
  const response = await axios.post('/api/address', {
    name: ship.name,
    last_name: ship.last_name,
    _address: ship._address,
    phone: ship.phone 
  }, getHeaders());
  setAddress([...ship, response.data]);
};

const fetchAddress = async(setAddress)=> {
  const response = await axios.get('/api/address');
  setAddress(response.data);
};




const fetchProducts = async(setProducts)=> {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchVipProducts = async(setVip_Products)=> {
  const response = await axios.get('/api/products/vip_products');
  setVip_Products(response.data);
};

const fetchOrders = async(setOrders)=> {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const fetchLineItems = async(setLineItems)=> {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const createLineItem = async({ product, cart, lineItems, setLineItems })=> {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};


const fetchReviews = async (setReviews) => {
  const response = await axios.get('/api/reviews',getHeaders());
  setReviews(response.data);
}

const createReview = async (userId, review, reviews, setReviews, productId) => {
  console.log(`api/createReview ${JSON.stringify(review)} ${review.reviewtext}`)
  const response = await axios.post('/api/reviews/create',{
    product_id: productId,
    text: review.reviewtext,
  }, getHeaders());
  setReviews([...reviews, response.data])
}

const createProduct = async (userId, product, products, setProducts, productId) => {
  const response = await axios.post('/api/products/add',{
    product_id: productId,
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    is_vip_product: false
  }, getHeaders());
  setProducts([...products, response.data])
}

const updateLineItem = async({ lineItem, cart, lineItems, setLineItems })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id === response.data.id ? response.data: lineItem));
};

const decrementQuantity = async({ lineItem, cart, lineItems, setLineItems })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity - 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id === response.data.id ? response.data: lineItem));
};

const updateOrder = async({ order, setOrders })=> {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const updateProduct = async({product, products, setProducts}) => {
  const response = await axios.put(`/api/products/${product.id}`, product, getHeaders())
  setProducts(products.map(product => product.id === response.data.id ? response.data : product))
}

const removeFromCart = async({ lineItem, lineItems, setLineItems })=> {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
};

const attemptLoginWithToken = async(setAuth)=> {
  const token = window.localStorage.getItem('token');
  if(token){
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
      console.log(response.data)
    }
    catch(ex){
      if(ex.response.status === 401){
        window.localStorage.removeItem('token');
      }
    }
  }
}

const login = async({ credentials, setAuth })=> {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
  console.log(credentials)
}

const logout = (setAuth)=> {
  window.localStorage.removeItem('token');
  setAuth({});
}


const fetchWishListItems = async (userId, setWishListItems) => {
  const response = await axios.get(`/api/wishlist/${userId}`, getHeaders());
  setWishListItems(response.data);
};

const addToWishList = async (userId, productId, wishListItems, setWishListItems) => {
  console.log(`api/addToWishList userId=${userId},productId=${productId}`)
  const response = await axios.post('/api/wishlist/add', {
    userId: userId,
    productId: productId
  }, getHeaders());
  setWishListItems([...wishListItems, response.data]);
  console.log(`addToWishList: response=${JSON.stringify(response.data)} items=${JSON.stringify(wishListItems)}`)
  return response.data
};

const removeFromWishList = async (userId, productId, setWishListItems, wishListItems) => {
  console.log(`api/removeFromWishList user=${userId},product=${productId}`)
  const response = await axios.delete(`/api/wishlist/remove/${userId}/${productId}`, getHeaders());
  setWishListItems(wishListItems.filter( _item => _item.product_id !== productId));
};


const api = {
  login,
  logout,
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  updateOrder,
  removeFromCart,
  attemptLoginWithToken,
  decrementQuantity,
  updateUser,
  createUser,
  fetchUsers,
  fetchReviews,
  fetchWishListItems,
  addToWishList,
  removeFromWishList,
  createAddress,
  fetchAddress,
  createReview,
  updateProduct,
  createProduct,
  fetchVipProducts
};

export default api;
