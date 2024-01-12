import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import api from './api';
import Signup from './Signup';
import axios from 'axios';
import Users from './Users';
import SingleProduct from './SingleProduct';

import Profile from './Profile';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);


  let location = useLocation()

  

  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
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


  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };
  
  const decrementQuantity = async(lineItem)=> {
    await api.decrementQuantity({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
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



 

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
  }

  return (
    <div>
      {
        auth.id ? (
          <>
            <nav>
              <Link to='/users'>Users ({users.length})</Link>
              <Link to='/products'>Products ({ products.length })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <Link to='/profile'>Profile</Link>
              <span>
                Welcome { auth.username }! 
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
            <main>

            <Routes>
            <Route path="/products" element={<Products products={products} auth = { auth } cartItems = { cartItems } createLineItem = { createLineItem } updateLineItem = { updateLineItem }  />} />
              <Route path="/products/:id" element={<SingleProduct products={products} createLineItem={createLineItem} />} />
              <Route path="/profile" element={ <Profile/>} />
              <Route path="/users" element={<Users users={users}/>} />
            </Routes>
            
            </main>


            {location.pathname === '/cart' && (
              <Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
                cartTotal = {cartTotal}
                incrementQuantity = { updateLineItem }
                decrementQuantity={decrementQuantity}
              />
            )}
            {location.pathname === '/orders' && (
              <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
              />
            )}
            
            </>
        ):(
          <div>
            <h3>Are you a New Customer? Create Account below to View More Products and Shop</h3>
            <Signup/>
            <h3>Existing Customers Please Login Below</h3>
            <Login login={ login }/>
            <Products
              products={ products }
              cartItems = { cartItems }
              createLineItem = { createLineItem }
              updateLineItem = { updateLineItem }
              auth = { auth }
            />
          </div>
        )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
