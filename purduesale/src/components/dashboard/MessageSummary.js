import React from 'react'
import userlogo1 from './userlogo1.png'
import './ProductSummary.css';

const MessageSummary = ({message}) => {
    return(
        <div class="card">
            <div class="card-image" align="center">
                <div class="card-content">
                    <span class="title">{message.text}</span>
                </div>       
            </div>
        </div>
    )
}

export default MessageSummary