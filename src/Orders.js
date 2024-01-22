import React from 'react';

const Orders = ({ orders, products, lineItems })=> {
  return (
    <div className='page-users'>
      <h2 className='pagetitletwo'>Orders</h2>
      
      <ul>
        {
          orders.filter(order => !order.is_cart).map( order => {

            let total = 0

            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            return (
              <li key={ order.id } className='orders-container'>
                ({ new Date(order.created_at).toLocaleString() })
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);

                      total += product.price * lineItem.quantity

                      return (
                        <li key={ lineItem.id }>
                          { product ? `${product.name} - Qty: ${lineItem.quantity}` : '' }
                          
                        </li>
                      );
                    })
                  }
                </ul>
                <div className='ordertotal'>Total: ${total}.00</div>
              </li>
            );
          })
        }
      </ul>
      
    </div>
  );
};

export default Orders;
