import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'
import VipUsers from './Vip';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth})=> {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Products</h2>

      <div className="searchBar">
        <p>Search Product</p>
        <SearchBar products={products} />
      </div>
      
      <ul>
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                <Link to={`/products/${product.id}`}>
                { product.name }
                </Link>
                , 
                
                
                ${product.price}.00, {product.description}
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
              </li>
            );
          })
        }
      </ul>
      <VipUsers />
    </div>
  );
};

export default Products;
