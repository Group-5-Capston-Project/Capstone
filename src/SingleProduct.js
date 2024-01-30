import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const SingleProduct = ({ products, cartItems, createLineItem, updateLineItem, auth, addToWishList, reviews }) => {
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

  const productreviews = reviews.filter(review => review.product_id === singleproduct.id)

 

  return (
    <div className='page-users-two'>

      {auth.id ? (
      <Link to='/products' className='backbuttontwo'>Back to all products</Link>
      ): <Link to='/' className='backbuttontwo'>Back to all products</Link>}

      <h2 className='pagetitletwo'></h2>

      <div className='left'>
      <div className='productimage'>{singleproduct.image ? <img src={singleproduct.image} /> : null}</div>
      </div>

      <div className='right'>
        <h3 className='singleproductname'>{singleproduct.name}</h3>

        {auth.id ? (
          <>
      <p>${singleproduct.price}.00</p>
      <p>{singleproduct.description}</p>
      </>
      ) : null}

      <ul className="singleproductaddbutton">
        <li key={singleproduct.id}>
          <Link to={`/products/${singleproduct.id}`}></Link>

          {auth.id ? (
            <>
              {cartItem ? (
                <button onClick={() => updateLineItem(cartItem)} className='addbutton'>Add Another</button>
              ) : (
                <>
                  <button onClick={() => createLineItem(singleproduct)} className='addbutton'>Add To Cart</button>

                  
                </>
                
                )}
                <button onClick={() => addToWishList(singleproduct.id)} className='addbutton'>Add To Wish List</button>
            </>
          ) : null}
          
          

          {auth.is_admin ? (
            <div><Link to={`/products/${singleproduct.id}/edit`} className='editbutton'>Edit Product</Link>
              </div>
          ) : null}
        </li>
      </ul>


      <br />
      
      {auth.id ? (
        <>
      <h3>Reviews</h3>
            <ul>
                {productreviews.map(review => (
                  <li key={review.id}>
                    {review.text}
                  </li>
                ))}
                
            </ul>
            

            <div ><Link to='/reviews' className='editbutton'>Create Review</Link></div>
            </>
          ) : null}

          {!auth.id ? (
            <>
          <div>Log in or sign up to see product details</div>
          <button><Link to="/login">Login</Link></button>
          <button><Link to="/signup">Sign up</Link></button>
          </>
          ) : null}


      </div>


      <div className='bottom'>
      <button onClick={handlePrevButtonClick} className='previousbutton'>Previous Product</button>
      <button onClick={handleNextButtonClick} className='nextbutton'>Next Product</button>
      </div>
      

    </div>
    
  );
  
};

export default SingleProduct;
