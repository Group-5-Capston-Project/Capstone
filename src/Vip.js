import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProductImageEditor from './ProductImageEditor';

const VipUsers = ({products, cartItems, createLineItem, updateLineItem, auth, updateProduct }) => {
    const navigate = useNavigate();
    return (
        <div>
            {auth.is_vip || auth.is_admin ? 
                <div className='page-users '>
                    <h2 className='pagetitle'> Thank you {auth.username}! Enjoy only VIP Products Below!</h2>
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
                           products
                           .filter(product => product.is_vip_product == true)
                           .map((product) => {
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
                            )
                           }) 
                        }
                    </ul>
                </div> 
                : <h2 className='pagetitle'>You Must be A Vip User to View this Page. Please contact Admin to join VIP customers or for further assistance </h2> }

        </div>
    )
}

export default VipUsers;