import React, {useState} from 'react';

const ReviewsForm = ({ createReview, products }) => {

    const [product, setProduct] = useState('');
    const [reviewtext, setReviewText] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault()


        if (products.map(p => p.name).includes(product)) {
            const newreview = {
                product, reviewtext
            };
            createReview(newreview);
        } else {
            alert ('product not found');
        }    
        
    };


    return (
       
            

            <div className='reviewform'>
            <h3 className='formtitle'>Create Review:</h3>

            <form onSubmit={handleSubmit}>
                
               
                    
                    <select value={product} onChange={(event) => setProduct(event.target.value)} className='select-product'>
                        <option value='' disabled>Select a product</option>
                    {products.map((p) => (<option key={p.id} value={p.name}>{p.name}
                    </option>
                        ))}
                        </select>
                    
                    <input placeholder='Write review...' type="text" value={reviewtext} onChange={(event) => {setReviewText(event.target.value)}}/>
                

                <button type="submit" className='button'>Submit</button>

            </form>

            </div>
            
      
    )
}

export default ReviewsForm;