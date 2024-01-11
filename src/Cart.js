import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, cartTotal, incrementQuantity, decrementQuantity })=> {
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <li key={ lineItem.id }>
                { product.name }
                ({ lineItem.quantity })

                <button onClick={() => {incrementQuantity(lineItem)}}>+</button>

                <button onClick={() => 
                
                  {if(lineItem.quantity > 1) {
                    decrementQuantity(lineItem)
                  }else {
                  removeFromCart(lineItem)
                }}}>-</button>
                
                
                
                ${product.price * lineItem.quantity}
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
              </li>
            );
          })
        }
      </ul>
      <div>Total: ${cartTotal}</div>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
          updateOrder({...cart, is_cart: false });
        }}>Create Order</button>: null
      }
    </div>
  );
};

export default Cart;
