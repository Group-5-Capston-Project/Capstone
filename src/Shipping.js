import React from 'react';
import { useState} from "react";
import axios from 'axios';


const Shipping = () => {
    const [name, setName] = useState('')
    const [last_name, setLast_name] = useState('')
    const [_address, set_address] = useState('')
    const [phone, setPhone] = useState('')
  
    const handleSubmit = async (e) => {
        e.preventDefault();

      
        if (name.length == 0) {
            alert('Invalid Form, name can not be empty')
            return
        }
        if (last_name.length == 0) {
            alert('Invalid Form, last name can not be empty')
            return
        }
        if (_address.length == 0) {
            alert('Invalid Form, address can not be empty')
            return
        }
        if (phone.length == 0) {
            alert('Invalid Form, phone can not be empty')
            return
        }
        const ship = {
            name,
            last_name,
            _address,
            phone
        } 
        try{
            await axios.post('/api/ship', ship)
        } catch(error){
        }
        setName(''),
        setLast_name(''),
        set_address(''),
        setPhone(''),
        alert("Thank you for submitting your address!")
        window.location.reload(false);
    }
    return (
        <div>
  
           <form className='createproductform' onSubmit= {handleSubmit}>
                
                <h2>Shipping Address</h2>
                
                <input className='inputAdd' 
                placeholder='First Name'
                type="text" 
                value={name} 
                onChange={(e) => {setName(e.target.value)}}
                />
                 <input className='inputAdd' 
                placeholder='Last Name'
                type="text" 
                value={last_name} 
                onChange={(e) => {setLast_name(e.target.value)}}
                />
                 <input className='inputAdd' 
                placeholder='Address'
                type="text" 
                value={_address} 
                onChange={(e) => {set_address(e.target.value)}}
                />
                 <input className='inputAdd' 
                placeholder='Phone'
                type="text" 
                value={phone} 
                onChange={(e) => {setPhone(e.target.value)}}
                />
              
                
                <button className='createbutton' type="submit">Submit</button>
                
            </form>

        </div>
    )
}

export default Shipping;