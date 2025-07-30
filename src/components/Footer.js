import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <Link to="/" className="footer-logo">Sara <span>Services</span></Link>
            <p>Your one-stop solution for all home service needs. Reliable, professional, and always on time.</p>
          </div>
          <div className="footer-links">
            <h4>SERVICES</h4>
            <ul>
              <li><a href="#services">AC Repair</a></li>
              <li><a href="#services">Plumbing</a></li>
              <li><a href="#services">Electrician</a></li>
              <li><a href="#services">Painting</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>LEGAL</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sara Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
