import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/household">Household</Link>
            <Link to="/neighborhood">Neighborhood</Link>
            <Link to="/utilities">Utilities</Link>
            <Link to="/social">Social</Link>
            <Link to="/incidents">Incidents</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Login</Link>
        </nav>
    );
}

export default Navbar;
