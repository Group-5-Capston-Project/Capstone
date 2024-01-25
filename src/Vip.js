import React from 'react';

const handleSubmit = () => {
    console.log('hello!')
}

const VipUsers = () => {
    return (
        <div>
            <h3>You are a VIP user!</h3>
            <button onClick={handleSubmit()}>Click Here to See VIP Products</button>
        </div>
    )
}

export default VipUsers