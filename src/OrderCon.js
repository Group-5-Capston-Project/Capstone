import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

const OrderCon = ({  orders , address , setAddress }) => {

    const navigate = useNavigate();
    
    return (
      <div >
        <h2>Thank you for your order! </h2>
        <ul> Confirmation #
        { orders.map( order => {
            return (
              <li key={ order.id }> 
                { order.id }
              </li>
            );
          }) }
       </ul>
       <h2> Address </h2>
       <ul>  
        { address.map( add => {
            return (
              <li key={ add.id }>
                { add.name }
                <br></br> 
                { add.last_name }
                <br></br> 
                { add._address }
                <br></br> 
                { add.phone }
              </li>
            );
          }) }
       </ul>

       

        <Link to ="/products"> Back to home </Link>
       
       
        
     
      </div>
    );
  };
  
  export default OrderCon;