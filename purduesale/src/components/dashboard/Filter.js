import React, {Component} from 'react'
import Select from 'react-select'

export default class Filter extends Component {
    render() {
        return (
            <div className="row">
                <div className="col s3">
                <label>Order By Price</label>
                    <div class="input-field col s12">
                        <select className="browser-default" value={this.props.sort}
                        onChange={this.props.handleChangeSort}>
                            <option value="">Select</option>
                            <option value="lowest">lowest to highest</option>
                            <option value="highest">highest to lowest</option>
                        </select>
                        
                    </div>
                </div>
                <div className="col s3">
                <label>Filter Category</label>
                    <div class="input-field col s12">
                        <select className="browser-default" value={this.props.tag}
                        onChange={this.props.handleChangeTag}>
                            <option value="">Select</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Textbooks">Textbooks</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Office Supplies">Office Supplies</option>
                            <option value="Tools">Tools</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Food">Food</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Other">Other</option>
                        </select>
                        
                    </div>
                </div>
            </div>
        )
    }
}