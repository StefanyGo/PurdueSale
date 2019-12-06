import React from 'react'
import userlogo1 from './userlogo1.png'
import './ProductSummary.css';

const ProductSummary = ({product, email}) => {
    return(
        <div class="card">
            <div class="card-image" align="center">
                <img className="Image" src={product.imageUrl || userlogo1} resizeMode='contain' style={{height: "59%", width: "90%"}} alt={product.ProductName}  />
                <div class="card-content">
                    <span class="title">{product.productName}</span>
                    <p>{product.description}</p>
                    <b>{product.price}</b>
                </div>
                <div class="card-action">
                    <p><a>{product.status}</a></p>
                </div>         
            </div>
        </div>
    )
}

export default ProductSummary