// src/components/Layout/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex justify-content-between align-items-center">
                <Link className="navbar-brand" to="/">Travel Request App</Link>
                <div>
                    <ul className="navbar-nav d-flex flex-row">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link" to="/travel-requests">My Requests</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;