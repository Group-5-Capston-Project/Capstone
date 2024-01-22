import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, cartTotal, incrementQuantity, decrementQuantity })=> {
  return (
    <div className='page-users'>
      <h2 className='pagetitletwo'>Cart</h2>
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <li key={ lineItem.id } className='cart-container'>
              <div> <span> { product.name } </span>- Qty: ({ lineItem.quantity })   - ${product.price * lineItem.quantity}

               
                <button onClick={() => {incrementQuantity(lineItem)}} className='inc-dec-button'>+</button>

                <button onClick={() => 
                
                  {if(lineItem.quantity > 1) {
                    decrementQuantity(lineItem)
                  }else {
                  removeFromCart(lineItem)
                }}} className='inc-dec-button'>-</button>
               

                </div>

                

                <button onClick={ ()=> removeFromCart(lineItem)} className='remove-button'>Remove From Cart</button>

                
              </li>
            );
          })
        }
      </ul>
      <div className='carttotal'>Order Total: <span>${cartTotal}.00</span></div>

      <div className='create'>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
          updateOrder({...cart, is_cart: false });
        }} className='create-button'>Create Order</button>: null
      }
      </div>
    </div>
  );
};

export default Cart;
