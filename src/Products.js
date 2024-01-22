import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'
import VipUsers from './Vip';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth})=> {
  const navigate = useNavigate();
  return (
    <div>
      <div className='page-users '>
      <h2 className='pagetitle'>Produce ({ products.length })</h2>
    

      
      <div className="searchBar">
        <SearchBar products={products} />
      </div>
      
      <ul className="productcontainer">
      
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              
                <li key={ product.id }>

                <div className='image_placeholder'>{product.image ? <img src={product.image} /> : null}</div>

                <div className='productname'><Link to={`/products/${product.id}`}>
                { product.name }
                </Link></div>
                
                
                
                <p>${product.price}.00</p>
                
                <p>{product.description}</p>


                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add To Cart</button>
                    ): null 
                  }
                  <br />
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
      </div>

      <VipUsers />
    </div>
  );
};

export default Products;
