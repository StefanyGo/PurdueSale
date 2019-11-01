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
        tag:'',
        loc:'',
    };
    

    onChange = e => {
        this.setState({search: e.target.value.substr(0, 20)});
    }

    handleChangeSort = e => {
        this.setState({sort: e.target.value});
    }

    handleChangeTag = e => {
        this.setState({tag: e.target.value});
    }

    handleChangeLocation = e => {
        this.setState({loc: e.target.value})
    }


    listProducts(products){
        const { sort } = this.state;
        const { tag } = this.state;
        const { loc } = this.state;
        let filteredProducts = products;
        if (sort !== ''){
            filteredProducts.sort((a,b)=>(sort==='lowest')? (a.price > b.price?1:-1): (a.price < b.price?1:-1))
        } else {
            filteredProducts.sort((a,b)=>(a.productName<b.productName?1:-1));
        };

        if (tag != ''){
            filteredProducts = filteredProducts.filter(
                product => {
                    return product.tag.toLowerCase().indexOf(tag.toLowerCase()) !== -1
                }
            );
        }

        if (loc != ''){
            if (loc === "true") {
                filteredProducts = filteredProducts.filter(
                    product => {
                        return product.oncampus == 1
                    }
                )
            } else {
                filteredProducts = filteredProducts.filter(
                    product => {
                        return product.oncampus == 0
                    }
                )
            }
            
        }
        return filteredProducts;
    }

    render(){
        const { products } = this.props;
        const { search } = this.state;
        let filteredProducts;
        if (!products) {
            filteredProducts = products;
        } else {
            
            filteredProducts = this.listProducts(products)
            filteredProducts = filteredProducts.filter(
                product => {
                    return product.productName.toLowerCase().indexOf(search.toLowerCase()) !== -1
                }
            );
        }
        return (
            <div>
                <div className="product-list section">
                    <div class="row">
                        <div class="col ">
                            Search:
                            <div class="input-field inline">
                                <input type="text" value={this.state.search} onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <Filter handleChangeSort={this.handleChangeSort} handleChangeTag={this.handleChangeTag} handleChangeLocation={this.handleChangeLocation} count='5' />
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