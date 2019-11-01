import React , { Component }  from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import ProductSummary from './ProductSummary'
import Filter from './Filter'

class MyProductList extends Component {
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
        const { user } = this.props;
        console.log(user);
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
        const { user } = this.props;
        let filteredProducts;
        if (!products) {
            filteredProducts = products;
        } else {
            console.log(user.email)
            filteredProducts = this.listProducts(products)
            filteredProducts = filteredProducts.filter(
                product => {
                    console.log(product.productName)
                    return product.posterEmail.toLowerCase().indexOf(user.email) !== -1
                }
            );
        }
        return (
            <div>
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
)(MyProductList)