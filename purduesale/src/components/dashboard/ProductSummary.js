import React from 'react'
import userlogo1 from './userlogo1.png'

const ProductSummary = ({product}) => {
    return(
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{product.description}</span>
                <img className="Avatar" src={product.imageUrl || userlogo1} alt="UserLogo" width="200" height="150" />
            </div>
        </div>
    )
}

export default ProductSummary