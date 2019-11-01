import React from 'react'
import userlogo1 from './userlogo1.png'
import './ProductSummary.css';

const ProductSummary = ({product}) => {
    return(
        <div class="card">
            <div class="card-image" align="center">
                <img className="Image" src={product.imageUrl || userlogo1} resizeMode='contain' style={{height: "57%", width: "90%"}} alt={product.ProductName}  />
                <div class="card-content">
                <span class="title">{product.productName}</span>
                <p>{product.description}</p>
                <b>{product.price}</b>
            </div>
            <div class="card-action">
            <a >{product.status}</a>
            </div>         
        </div>
</div>
    )
}

export default ProductSummary