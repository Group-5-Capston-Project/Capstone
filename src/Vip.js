import React from 'react';
import { Link } from 'react-router-dom';

const handleSubmit = () => {
    console.log('hello!')
}

const VipUsers = ({auth, vip_products}) => {
   
    return (
        <div>
            {auth.is_vip ?
            <div>
                <h3>You are a VIP user!</h3>
                <button onClick={handleSubmit()}>Click Here to See VIP Products</button>
                <ul className="productcontainer">
                    {
                        vip_products.map((vip_product) => {
                            return(
                                <li key={vip_product.id}>
                                 <div className='productname'>
                                    {vip_product.name}
                                    {vip_product.image ? <img className='image_placeholder' src={vip_product.image} /> : null}
                                </div>

                                    <p>${vip_product.price}.00</p>

                                    <p>{vip_product.description}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
         : 
         <h2>You must be a VIP User to view this page.</h2>
         }
            
        </div>
    )
}

export default VipUsers