import {Link,useParams, useNavigate} from 'react-router-dom'
import React from 'react';

const SingleProduct = ({products}) => {
    const params = useParams();
    const id = params.id*1

    const singleproduct = products.find((product) => {
        return product.id === id
    })

    if (!singleproduct) {
        return <p>Product not found</p>
    }
    return (
        <div>
            <h2>Single Product</h2>
            

        </div>
    )
}

export default SingleProduct


