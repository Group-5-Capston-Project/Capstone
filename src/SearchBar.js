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
            <div className="searchbarlabel">
            <label >
                <input type="text" placeholder="Search Product" value={searchProduct} onChange={(e) => {setSearchProduct(e.target.value)}}/>
            </label>
            

            {
                searchProduct.length > 0 ?
                <div className='searchresults'>
                    <p>Viewing {filteredproducts.length} products of {products.length}</p>

                    <ul className="searchlist">
                        {filteredproducts.map((product) => {
                            return <li key={product.id}><Link to={`/products/${product.id}`}>{product.name}</Link></li>
                        })}
                    </ul>
                </div>
                : null
            }
            </div>
        </div>
    )


}


export default SearchBar
