import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

const OrderCon = ({ orders, address, setAddress }) => {

  const navigate = useNavigate();
  return (
    <div className='page-users'>
      <h2 className='pagetitletwo'>Thank you for your order! </h2>
      <ul className='shippingcontainer'> 
      <h2 className='formtitle'>Confirmation #</h2>
        {orders.map(order => {
          return (
            <li key={order.id} >
              {order.id}
            </li>
          );
        })}
      </ul>
      <h2 className='shippingheader'> Address </h2>
      <ul className='shippinglist'>
        {address.map(add => {
          return (
            <li key={add.id} className='address'>
              {add.name}
              <br></br>
              {add.last_name}
              <br></br>
              {add._address}
              <br></br>
              {add.phone}
            </li>
          );
        })}
      </ul>

      <div className='center'>
        <Link to="/products" className='backbuttonthree'> Back to all products </Link>
      </div>







    </div>
  );
};

export default OrderCon;