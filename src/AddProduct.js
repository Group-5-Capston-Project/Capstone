import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

const AddProduct = ({ products, createProduct }) => {

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState ('')
    const [description, setDescription] = useState ('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const newproduct = {
            name, image, price, description
        }
        createProduct(newproduct)
    }



    return (
        <div className='page-users'>
            <h2 className='pagetitletwo'>Add Product</h2>

            <form onSubmit={handleSubmit}>
                <input placeholder='Name...' type="text" value={name} onChange={(event) => {setName(event.target.value)}} />
                <input placeholder='Price...' type="text" value={price} onChange={(event) => {setPrice(event.target.value)}} />
                <input placeholder='Description...' type="text" value={description} onChange={(event) => {setDescription(event.target.value)}} />

                <button type="submit">Submit</button>
                
            </form>




        </div>
    );
};

export default AddProduct;
