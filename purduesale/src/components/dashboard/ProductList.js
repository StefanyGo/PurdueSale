import React , { Component }  from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import ProductSummary from './ProductSummary'

class ProductList extends Component {
    state = {
        search: ''
    };
    

    onChange = e => {
        this.setState({search: e.target.value.substr(0, 20)});
    }

    render(){
        const { products } = this.props;
        const { search } = this.state;
        let filteredProducts;
        if (!products) {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(
                product => {
                    return product.productName.toLowerCase().indexOf(search.toLowerCase()) !== -1
                }
            );
        }
        return (
            <div className="product-list section">
                <input type="text" value={this.state.search} onChange={this.onChange} />
                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i class="material-icons right">search</i>
                </button>
                <div class="row">
                    { filteredProducts && filteredProducts.map(product => {
                        return (
                            <Link to={'/product/' + product.id}>
                                <div class="col s3">
                                <ProductSummary product={product}/>
                                </div>
                            </Link>
                        )
                    })
                    }
                </div>
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        products: state.firestore.ordered.products,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }
    ])
)(ProductList)