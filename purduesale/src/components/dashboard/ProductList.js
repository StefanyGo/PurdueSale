import React , { Component }  from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import ProductSummary from './ProductSummary'
import Filter from './Filter'

class ProductList extends Component {

    constructor (props) {
        super(props);
        this.state = {
            suggestions: [],
            sort:'',
            sortedProd:'',
            tag:'',
            loc:'',
            text:'',
            course:'',
            history : [
                'Books',
                'Car',
                'Camera',
                'Helmet',
                'Couch',
                'Sublease',
                'Table',
                'Food',
                'Fruits',
                'Textbook',
            ]
        };
    }
    

    onChange = e => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.history.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    addHistory = e => {
        e.preventDefault();
        this.setState({history: this.state.history.concat(this.state.text)})
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((history) => <li onClick={() => this.suggestionSelected(history)}>{history}</li>)}
            </ul>
        )
    }

    suggestionSelected (value) {
        this.setState(() =>({
            text: value,
            suggestions: [],
        }))
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

    handleChangeCourse = e => {
        this.setState({course: e.target.value})
    }


    listProducts(products){
        const { course } = this.state;
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

        if (course != ''){
            filteredProducts = filteredProducts.filter(
                product => {
                    if (!product.textbookCourse) return null
                    else 
                    return product.textbookCourse.toLowerCase().indexOf(course.toLowerCase()) !== -1
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
        const { text } = this.state;
        let filteredProducts;
        if (!products) {
            filteredProducts = products;
        } else {
            
            filteredProducts = this.listProducts(products)
            filteredProducts = filteredProducts.filter(
                product => {
                    return product.productName.toLowerCase().indexOf(text.toLowerCase()) !== -1
                }
            );
        }
        return (
            <div>
                <form onSubmit={this.addHistory} >
                <div className="product-list section">
                    <div class="row">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">search</i>
                                    <input inline id="autocomplete-input" type="text" value={text} onChange={this.onChange}/>
                                    {this.renderSuggestions()}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
                <Filter handleChangeSort={this.handleChangeSort} handleChangeTag={this.handleChangeTag} handleChangeLocation={this.handleChangeLocation} handleChangeCourse={this.handleChangeCourse} />
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