import React from 'react'
import userlogo1 from './userlogo1.png'
import './ProductSummary.css';

const ProductSummary = ({product}) => {
    return(

        <div class="card">
            <div class="card-image">
                <img className="Image" src={product.imageUrl || userlogo1} alt={product.ProductName}  />
                <div class="card-content">
                <span class="title">{product.productName}</span>
                <p>{product.description}</p>
            </div>
            <b>{product.price}</b>
            <div class="card-action">
            <a >Add to Cart</a>
            </div>         
        </div>
</div>
    )
}

export default ProductSummary