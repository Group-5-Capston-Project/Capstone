import React from 'react';
import {Link} from "react-router-dom";
import {useState} from "react"


const SearchBar = ({products}) => {
    const [searchProduct, setSearchProduct] = useState('')

    const filteredproducts = products.filter ((product) => {
        return product.name.toLowerCase().indexOf(searchProduct.toLowerCase()) !== -1
    })

    return (
        <div>
            <label>
                <input type="text" value={searchProduct} onChange={(e) => {setSearchProduct(e.target.value)}}/>
            </label>
            {
                searchProduct.length > 0 ?
                <div>
                    <h3>viewing {filteredproducts.length} products of {products.length}</h3>

                    <ul className="searchlist">
                        {filteredproducts.map((product) => {
                            return <li key={product.id}>{product.name}</li>
                        })}
                    </ul>
                </div>
                : null
            }
        </div>
    )


}


export default SearchBar
