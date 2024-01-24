import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'
import VipUsers from './Vip';
import ProductImageEditor from './ProductImageEditor';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='page-users '>

          <h2 className='pagetitle'>Produce ({products.length})</h2>

        <div className="searchBar">
          <SearchBar products={products} />
        </div>

        {
            auth.is_admin ? (
              <Link to={'/products/add'} className='addproductbutton'>Add product</Link>
            ) : null
          }

        <ul className="productcontainer">

          {
            products.map(product => {
              const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
              return (

                <li key={product.id}>


                  <div className='productname'><Link to={`/products/${product.id}`}>
                    {product.name}
                    {product.image ? <img className='image_placeholder' src={product.image} /> : null}
                  </Link></div>



                  <p>${product.price}.00</p>

                  <p>{product.description}</p>


                  {
                    auth.id ? (
                      cartItem ? <button onClick={() => updateLineItem(cartItem)}>Add Another</button> : <button onClick={() => createLineItem(product)}>Add To Cart</button>
                    ) : null
                  }
                  <br />

                  {
                    auth.is_admin ? (
                      <div>
                        <Link to={`/products/${product.id}/edit`}>Edit</Link>
                        < ProductImageEditor updateProduct={updateProduct} product={product} />
                      </div>
                    ) : null
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
