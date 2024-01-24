import React from 'react'
import {useState, useRef, useEffect} from 'react'

const ProductImageEditor = (updateProduct, product) => {

    const [data, setData] = useState('')

    const el = useRef()

    useEffect(() => {
        el.current.addEventListener('change', (event) => {
            const file = event.target.files[0]
            setData(file)
        })
    })

    const changeImage = () => {
        const reader = new FileReader()
        reader.readAsDataURL(data)
        reader.addEventListener('load', async() => {
            product = {...product, image : reader.result}
            await updateProduct(product)
        })
        setData('')
        el.current.value = ''
    }
    return (
        <div>
            <input type='file' ref={el}/>
            <br/>
            { 
                data ? <button onClick={()=> {changeImage()}}>Submit</button> : null
            }
        </div>
    )
}

export default ProductImageEditor