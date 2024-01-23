import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

const EditProduct = ({products, updateProduct}) => {
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
    }

    return (
        <div className='page-users'>
            <h2 className='pagetitletwo'>Edit Product</h2>
            <h2 className='pagetitletwo'>{singleproduct.name}</h2>

            <div className='productimagecontainer'>
                <div className='productimage'>
                    {singleproduct.image ? <img src={singleproduct.image} alt={singleproduct.name}/> : null}
                </div>
            </div>

            <div className='centertext'>

                <form onSubmit={handleSubmit}>
                    <input placeholder="Edit name..." type="text" value={newName} onChange={(event) => {
                        setnewName(event.target.value)
                    }}/>
                    <input placeholder="Edit price..." type="text" value={newPrice} onChange={(event) => {
                        setnewPrice(event.target.value)
                    }}/>
                    <input placeholder="Edit description..." type="text" value={newDescription} onChange={(event) => {
                        setnewDescription(event.target.value)
                    }}/>

                    <button type="submit">Submit</button>
                </form>


            </div>


        </div>
    );
};

export default EditProduct;
