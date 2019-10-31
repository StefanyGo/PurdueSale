import React, {Component} from 'react'
import Select from 'react-select'

export default class Filter extends Component {
    render() {
        return (
            <div className="row">
                <div className="col s3">
                    {this.props.count} products found.
                </div>
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
            </div>
        )
    }
}