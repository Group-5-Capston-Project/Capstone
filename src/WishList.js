import React from 'react';

const WishList = ({ wishListItems, removeFromWishList, products, auth, cartItems, updateLineItem, createLineItem }) => {
    // console.log(`Wishlist: items=${JSON.stringify(wishListItems)}`)
    return (
        <div className='page-users'>
            <h2 className='pagetitletwo'>Wish List</h2>

            <ul>
                {
                    wishListItems.map((item) => {
                        const product = products.find((product) => product.id === item.product_id)
                        const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id)
                        console.log(`wishlist item = ${JSON.stringify(item)}`)
                        return (
                            <li key={item.id} className='wishlistcontainer'>
                                <p>{product.name}</p>

                                {
                                    auth.id ? (
                                        cartItem ?
                                            <button onClick={() => updateLineItem(cartItem)}>Add Another</button> :
                                            <button onClick={() => createLineItem(product)}>Add To Cart</button>
                                    ) : null
                                }

                                <button onClick={() => {
                                    console.log(`on click remove ${auth.id} ${item.product_id}`)
                                    removeFromWishList(item.product_id)
                                }}>
                                    Remove from Wish List
                                </button>
                            </li>

                        )
                    }
                    )
                }
            </ul>

        </div>
    );
};

export default WishList;
