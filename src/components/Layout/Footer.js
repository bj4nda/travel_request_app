// src/components/Layout/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-3 mt-auto">
            <div className="container text-center">
                <p className="mb-0">© {new Date().getFullYear()} Travel Request System</p>
            </div>
        </footer>
    );
};

export default Footer;