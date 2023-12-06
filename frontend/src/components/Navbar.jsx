import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div style={{display:"flex", gap:"2rem", paddingInline:"2rem", paddingBlock:"1rem"}}>
                <Link to="/">Home</Link>
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/login">Login</Link>
        </div>
    )
}
