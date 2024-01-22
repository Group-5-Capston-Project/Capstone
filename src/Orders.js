import React from 'react';
import Shipping from './Shipping';

const Orders = ({ orders, products, lineItems })=> {
  return (
    <div>
      <h2>Orders</h2>
      
      <ul>
        {
          orders.filter(order => !order.is_cart).map( order => {

            let total = 0

            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            return (
              <li key={ order.id }>
                ({ new Date(order.created_at).toLocaleString() })
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);

                      total += product.price * lineItem.quantity

                      return (
                        <li key={ lineItem.id }>
                          { product ? `${product.name} - quantity: ${lineItem.quantity}` : '' }
                          
                        </li>
                      );
                    })
                  }
                </ul>
                <div>Total: ${total}.00</div>
              </li>
            );
          })
        }
      </ul>
       <Shipping/>
    </div>
  );
};

export default Orders;
