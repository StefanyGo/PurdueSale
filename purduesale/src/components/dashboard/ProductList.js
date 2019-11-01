import React , { Component }  from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import ProductSummary from './ProductSummary'
import Filter from './Filter'

class ProductList extends Component {
    state = {
        search: '',
        sort:'',
        sortedProd:'',
    };
    

    onChange = e => {
        this.setState({search: e.target.value.substr(0, 20)});
    }

    handleChangeSort = e => {
        this.setState({sort: e.target.value});
    }


    listProducts(){
        const { products } = this.props;
        const { sort } = this.state;
        let filteredProducts = products;
        if (sort !== ''){
            filteredProducts.sort((a,b)=>(sort==='lowest')? (a.price > b.price?1:-1): (a.price < b.price?1:-1))
        } else {
            filteredProducts.sort((a,b)=>(a.productName<b.productName?1:-1));
        };
        return filteredProducts;
    }

    render(){
        const { products } = this.props;
        const { search } = this.state;
        let filteredProducts;
        if (!products) {
            filteredProducts = products;
        } else {
            
            filteredProducts = this.listProducts()
            filteredProducts = filteredProducts.filter(
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
                <Filter handleChangeSort={this.handleChangeSort} count='5' />
                <div class="row">
                    { filteredProducts && filteredProducts.map(product => {
                        return (
                            <Link to={'/product/' + product.id}>
                                <div class="col s3" key={product.id}>
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