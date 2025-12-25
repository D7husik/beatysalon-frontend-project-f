import React from 'react';

/**
 * Footer Component
 * Page footer with Suulu Salon logo and copyright
 */
const Footer = () => (
    <footer className="footer">
        <div className="footer__container">
            <div className="footer__content">
                <div className="footer__logo">
                    <img
                        src="/images/logo.png"
                        alt="Suulu Salon"
                        className="footer__logo-img"
                    />
                </div>
                <p className="footer__copyright">
                    © 2025 Suulu Salon. All rights reserved.
                </p>
                <p className="footer__tagline">
                    Experience Korean Beauty | Nails | Hair | Skincare
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
