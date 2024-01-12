import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const SingleProduct = ({ products, cartItems, createLineItem, updateLineItem, auth }) => {
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

  return (
    <div>
      <h2>Single Product</h2>
      <p>{singleproduct.name}</p>
      <p>{singleproduct.price}</p>
      <p>{singleproduct.description}</p>
  


      <br />
      <button onClick={handlePrevButtonClick}>Previous Product</button>
      <button onClick={handleNextButtonClick}>Next Product</button>
    </div>
  );
};

export default SingleProduct;
