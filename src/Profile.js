import React from 'react';
import ReviewsForm from './ReviewsForm';

const Reviews = ({ reviews, products, createReview }) => {
    // Filter products that have reviews
    const productsWithReviews = products.filter(product =>
        reviews.some(review => review.product_id === product.id)
    );

    return (
        <div className='page-users'>
            <h2 className='pagetitletwo'>Reviews</h2>

            <ReviewsForm createReview={createReview} products={products} />

            <ul>
                {productsWithReviews.map(product => (
                    <li key={product.id} className='review-container'>
                        <p className='review-product-name'>{product.name}</p>
                        <ul>
                            {reviews
                                .filter(review => review.product_id === product.id)
                                .map(review => (
                                    <li key={review.id}>
                                        {review.text}
                                    </li>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Reviews;
