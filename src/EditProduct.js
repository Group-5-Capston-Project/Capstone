import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';


const EditProduct = ({products, updateProduct, product}) => {
    const params = useParams();
    const id = params.id;

    const [newName, setnewName] = useState('')
    const [newPrice, setnewPrice] = useState('');
    const [newDescription, setnewDescription] = useState('')

    const singleproduct = products.find((product) => product.id === id);

    if (!singleproduct) {
        return <p>Product not found</p>;
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (newName.length > 0) {
            singleproduct.name = newName
        }
        if (newPrice.length > 0) {
            singleproduct.price = newPrice
        }
        if (newDescription.length > 0) {
            singleproduct.description = newDescription
        }
        updateProduct(singleproduct)

        setnewName('');
        setnewPrice('');
        setnewDescription('');

    }

    return (
        <div className='page-users'>
            <h2 className='pagetitletwo'>Edit Product</h2>
            <p className='editproducttext'>Name: {singleproduct.name}</p>
            <p className='editproducttext'>Price: ${singleproduct.price}.00</p>
            <p className='editproducttext'>Description: {singleproduct.description}</p>

            <div className='editproductimagecontainer'>
                <div className='productimage'>
                    {singleproduct.image ? <img src={singleproduct.image} alt={singleproduct.name}/> : null}
                </div>
            </div>

            <div className='centertext'>

         

                <form onSubmit={handleSubmit} className='editproductform'>
                    <input placeholder="Edit name..." type="text" value={newName} onChange={(event) => {
                        setnewName(event.target.value)
                    }}/>
                    <input placeholder="Edit price..." type="text" value={newPrice} onChange={(event) => {
                        setnewPrice(event.target.value)
                    }}/>
                    <input placeholder="Edit description..." type="text" value={newDescription} onChange={(event) => {
                        setnewDescription(event.target.value)
                    }}/>

                    <button className='editproductbutton' type="submit">Submit</button>

                    <Link to='/products' className='backbuttonthree'>Back to all products</Link>

                </form>


            </div>


        </div>
    );
};

export default EditProduct;
