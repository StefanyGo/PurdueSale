import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Signup</NavLink></li>
            <li><NavLink to='/'>LogIn</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>NN</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks