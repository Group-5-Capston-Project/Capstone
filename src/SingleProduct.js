import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const SingleProduct = ({ products, cartItems, createLineItem, updateLineItem, auth, addToWishList }) => {
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return <p>Product not found</p>;
  }

  const nextProductIndex = (index + 1) % products.length;
  const nextProductId = products[nextProductIndex].id;

  const prevProductIndex = (index - 1 + products.length) % products.length;
  const prevProductId = products[prevProductIndex].id;

  const handleNextButtonClick = () => {
    navigate(`/products/${nextProductId}`);
  };

  const handlePrevButtonClick = () => {
    navigate(`/products/${prevProductId}`);
  };

  const singleproduct = products[index];
  const cartItem = cartItems.find(lineItem => lineItem.product_id === singleproduct.id);

  return (
    <div>
      <br />
      <Link to='/products'>Back to all products</Link>

      <h2>Single Product</h2>
      <h3>{singleproduct.name}</h3>
      <p>${singleproduct.price}.00</p>
      <p>{singleproduct.description}</p>

      <ul className="singleproductaddbutton">
        <li key={singleproduct.id}>
          <Link to={`/products/${singleproduct.id}`}></Link>

          {auth.id ? (
            <>
              {cartItem ? (
                <button onClick={() => updateLineItem(cartItem)}>Add Another</button>
              ) : (
                <>
                  <button onClick={() => createLineItem(singleproduct)}>Add To Cart</button>

                  
                </>
                
              )}
            </>
          ) : null}

<button onClick={() => addToWishList(singleproduct.id)}>Add To Wish List</button>

          {auth.is_admin ? (
            <Link to={`/products/${singleproduct.id}/edit`}>Edit</Link>
          ) : null}
        </li>
      </ul>

      <br />
      <button onClick={handlePrevButtonClick}>Previous Product</button>
      <button onClick={handleNextButtonClick}>Next Product</button>
    </div>
  );
};

export default SingleProduct;
