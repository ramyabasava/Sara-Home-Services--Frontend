import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';

import { BsSearch, BsShieldCheck, BsPeople, BsLightbulb, BsTools } from 'react-icons/bs';

const API_BASE_URL = 'https://sara-home-services-backend.onrender.com';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch services
    axios.get(`${API_BASE_URL}/services`)
      .then(response => setServices(response.data))
      .catch(error => console.error("Error fetching services:", error));

    // Fetch testimonials
    axios.get(`${API_BASE_URL}/testimonials`)
      .then(response => setTestimonials(response.data))
      .catch(error => console.error("Error fetching testimonials:", error));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Reliable Home Services, <span>On Demand</span></h1>
          <p className="subtitle">From a leaky faucet to a complete home renovation, we've got you covered.</p>
          <div className="troubleshooter">
            <p>Don't know which service you need? Describe your problem below.</p>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="e.g., 'My AC is not cooling' or 'The kitchen sink is clogged'" />
            <BsSearch className="search-icon" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Professional services to take care of all your home needs.</p>
           <div className="services-grid">
                {services.map(service => (
                <ServiceCard
                 key={service.id}
                 serviceId={service.id} // <-- ADD THIS LINE
                    iconName={service.icon_name}
                    name={service.name}
                    description={service.description}
                />
             ))}
            </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="section why-choose-us-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">We are committed to providing you with the best service experience.</p>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper"><BsShieldCheck className="feature-icon" /></div>
              <h3>Verified Professionals</h3>
              <p>We ensure all our partners are background-checked and highly trained.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper"><BsPeople className="feature-icon" /></div>
              <h3>Customer-Centric</h3>
              <p>Our focus is on providing the best experience and satisfaction to you.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper"><BsLightbulb className="feature-icon" /></div>
              <h3>Transparent Pricing</h3>
              <p>No hidden costs. Know the price before you book the service.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper"><BsTools className="feature-icon" /></div>
              <h3>Innovative Solutions</h3>
              <p>We use AI to help you find the right service for your problem quickly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real stories from satisfied customers who trust ServiceOnWheel.</p>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div>
                    <div className="author-name">{testimonial.author_name}</div>
                    <div className="author-title">{testimonial.author_title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
