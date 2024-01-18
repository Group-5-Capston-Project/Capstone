import React, { useState } from 'react';


const Shipping = () => {
    const [check, setCheck] = useState(false)
    const [state,setState] = useState({
        deliveryName: "",
        deliveryLastName: "",
        deliveryAddress: "",
        deliveryPhone:"",
    })

    const onChange = (ev) => {
        const { name, value } = ev.target
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }


    return(
        <div className="address">
            <form>
                <h2>Shipping Address</h2>
                <input
                className='inputAdd' 
                type="text" 
                name="deliveryName" 
                placeholder='First Name' 
                autoComplete='{false}' 
                onChange={onChange}
                />
                <input
                className='inputAdd' 
                type="text" 
                name="deliveryLastName" 
                placeholder='Last Name' 
                autoComplete='{false}' 
                onChange={onChange}
                />
                <input
                className='inputAdd' 
                type="text" 
                name="deliveryAddress" 
                placeholder='Address' 
                autoComplete='{false}' 
                onChange={onChange}
                />
                <input
                className='inputAdd' 
                type="text" 
                name="deliveryPhone" 
                placeholder='Phone' 
                autoComplete='{false}' 
                onChange={onChange}
                />
                
                <input type='button' value='Submit'/>
                
            </form>

        </div>
    )
}

export default Shipping;