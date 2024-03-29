import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import userlogo1 from './userlogo1.png'
import NotifyButton from './NotifyButton'

const ProductDetails = (props) => {
    const { product, profile } = props;
    if (product) {
        const listCourse = props.product.textbookCourse ? 
        ( <div >
            Can be used for course: {product.textbookCourse}
        </div>
        ) 
        : 
        ( <div >
        </div> )
        ;
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{product.productName}</span>
                        <p>{product.description}</p>
                        <br></br>
                        {listCourse}
                        <img className="Avatar" src={product.imageUrl || userlogo1} alt="UserLogo" width="200" height="150" />
                        <p>{product.price}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted By:</div>
                        <div>{product.posterName}</div>
                    </div>
                    <NotifyButton product={product} email={profile.email} ></NotifyButton>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading products...</p>
            </div>
        )
    }
    
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const products = state.firestore.data.products;
    const product = products ? products[id] : null
    return {
        product: product,
        profile: state.firebase.profile,
        
    }
} 

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }
    ])
)(ProductDetails)