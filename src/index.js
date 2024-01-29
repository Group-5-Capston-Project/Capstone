import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import api from './api';
import Signup from './Signup';
import axios from 'axios';
import Users from './Users';
import SingleProduct from './SingleProduct';
import Reviews from './Reviews'
import Profile from './Profile';
import WishList from './WishList';
import Shipping from './Shipping';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import VipUsers from './Vip';


const App = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);

  const [address, setAddress] = useState([]);

  const {pathname} = location



  const attemptLoginWithToken = async () => {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(() => {
    attemptLoginWithToken();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchUsers(setUsers);
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      await api.fetchReviews(setReviews)
    }
    fetchData();
  }, []);

  const createReview = async (review) => {
    const p = products.find(p => p.name === review.product)
    if (p === undefined) {
      alert(`${p.name} not found`)
    } else {
      await api.createReview(auth.id, review, reviews, setReviews, p.id);
    }
  };

  const createUser = async (user) => {
      await api.createUser(auth.id, user, users, setUsers);
  };
  const createProduct = async (product) => {
      await api.createProduct(auth.id, product, products, setProducts);
  };

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchWishListItems(auth.id, setWishListItems);
      };
      fetchData();
    }
  }, [auth]);

  const updateUser = async(user)=> {
    await api.updateUser({ user, users, setUsers });
  };
 
  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const updateLineItem = async (lineItem) => {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const decrementQuantity = async (lineItem) => {
    await api.decrementQuantity({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async (order) => {
    await api.updateOrder({ order, setOrders });
  };

  const updateProduct = async (product) => {
    await api.updateProduct({ product, products, setProducts })
  }

  const removeFromCart = async (lineItem) => {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item) => {
    return acc += item.quantity;
  }, 0);

  const cartTotal = cartItems.reduce((acc, item) => {
    const product = products.find(p => p.id === item.product_id);
    if (product) {
      return acc += product.price * item.quantity;
    } else {
      return acc;
    }
  }, 0);

  const addToWishList = async (productId) => {
    const result = wishListItems.find(wl => wl.product_id === productId)
    if (result === undefined) {
      console.log(`src/addToWishList userId=${auth.id} productId=${productId}`)
      await api.addToWishList(auth.id, productId, wishListItems, setWishListItems);
    } else {
      console.log(`addToWishList productId=${productId} already exists in list`)
    }
  }

  const removeFromWishList = async (productId) => {
    console.log(`removeFromWishList userId=${auth.id} productId=${productId}`)
    await api.removeFromWishList(auth.id, productId, setWishListItems, wishListItems);
  }

  const login = async (credentials) => {
    await api.login({ credentials, setAuth });
  }

  const logout = () => {
    api.logout(setAuth);
    navigate('/');
  }
  console.log(auth)
  return (
    <div className='container'>
      {
        auth.id ? (
          <>

            <div className='header'>
              <div className='logo'><Link to="/products">Green<span>Harvest</span></Link></div>
              <nav>

              
              <div className="navitem"><Link to='/products' className={pathname === "/products" ? "selected" : ""}>Products </Link></div>
              <div className="navitem"><Link to='/products/vip_products' className={pathname === "/vip_products" ? "selected" : ""}>Vip Products </Link></div>
              <div className="navitem"><Link to='/orders' className={pathname === "/orders" ? "selected" : ""}>Orders ({ orders.filter(order => !order.is_cart).length })</Link></div>
              <div className="navitem"><Link to='/cart' className={pathname === "/cart" ? "selected" : ""}>Cart ({ cartCount })</Link></div>
              <div className="navitem"><Link to='/reviews' className={pathname === "/reviews" ? "selected" : ""}>Reviews</Link></div>
              <div className="navitem"><Link to='/wishlist' className={pathname === "/wishlist" ? "selected" : ""}>Wish List ({ wishListItems.length})</Link></div>
              <div className="navitem"><Link to= {`/users/${auth.id}`} className={pathname === "/users:id" ? "selected" : ""}> Profile </Link></div>
              {
              auth.is_admin ? (
                <div className="navitem"><Link to= {'/users'} className={pathname === "/users" ? "selected" : ""}> Users ({users.length})</Link></div>
              ) : null
              }
              
              <span>
                Welcome { auth.is_vip ? `${auth.username} VIP User` : auth.username}!
                <button onClick={ logout } className='logoutbutton'>Logout</button>
              </span>
            

              </nav>
            </div>
            <main>

            
            <Routes>
                <Route path="/products/vip_products" element={<VipUsers products={products} cartItems={cartItems} createLineItem={createLineItem} updateLineItem={updateLineItem} auth={auth} updateProduct={updateProduct} />} />
                <Route path="/products" element={<Products products={products} auth={auth} cartItems={cartItems} createLineItem={createLineItem} updateLineItem={updateLineItem} addToWishList={addToWishList} updateProduct={updateProduct} createProduct={createProduct} />} />
                <Route path="/products/:id" element={<SingleProduct products={products} auth={auth} cartItems={cartItems} createLineItem={createLineItem} updateLineItem={updateLineItem} addToWishList={addToWishList} reviews={reviews} updateProduct={updateProduct} />} />
                <Route path="/users" element={<Users users={users} createUser={createUser} />} />
                <Route path='/users/:id' element={ <Profile auth={ auth } users={ users } updateUser={ updateUser }/>} />
                <Route path="/reviews" element={<Reviews reviews={reviews} products={products} createReview={createReview} />} />
                <Route path="/wishlist" element={<WishList wishListItems={wishListItems} addToWishList={addToWishList} removeFromWishList={removeFromWishList} products={products} auth={auth} cartItems={cartItems} updateLineItem={updateLineItem} createLineItem={createLineItem} />} />
                <Route path="/cart" element={<Cart cart={cart} lineItems={lineItems} products={products} updateOrder={updateOrder} removeFromCart={removeFromCart} cartTotal={cartTotal} incrementQuantity={updateLineItem} decrementQuantity={decrementQuantity} />} />
                <Route path="/orders" element={<Orders orders={orders} products={products} lineItems={lineItems} />} />
                <Route path="/products/:id/edit" element={<EditProduct products={products}  auth={auth} updateProduct={updateProduct} />} />
                <Route path="/products/add" element={<AddProduct products={products} auth={auth} />} />

              </Routes>

            </main>
          </>
        ) : (
          <div>



            <div className="header">
              <div className='logo'><Link to="/">Green<span>Harvest</span></Link></div>

              <div className='signup'>
                <Link to="/signup">Sign up</Link>
              </div>

              <div className='login'>
                <Link to="/login">Login</Link>
              </div>
            </div>

            <div className='forms'>
              <Routes>
                <Route path="/login" element={<Login login={login} />} />
                <Route path="/signup" element={<Signup createUser={createUser} />} />
              </Routes>
            </div>


            <Routes>


              <Route path="/" element={
                <div className='products-page-nonusers'>
                  <Products
                    products={products}
                    cartItems={cartItems}
                    createLineItem={createLineItem}
                    updateLineItem={updateLineItem}
                    auth={auth}
                  />
                </div>
              } />

                <Route path="/products/:id" element={<SingleProduct products={products} auth={auth} cartItems={cartItems} createLineItem={createLineItem} updateLineItem={updateLineItem} addToWishList={addToWishList} reviews={reviews} updateProduct={updateProduct} />} />

            </Routes>

          </div>
        )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
