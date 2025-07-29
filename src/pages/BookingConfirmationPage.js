import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs'; // A nice checkmark icon

const BookingConfirmationPage = () => {
  // --- Hooks ---
  const location = useLocation(); // Hook to access the state passed during navigation
  
  // Safely get the bookingDetails from the location state.
  // This data was sent from the BookingPage after a successful API call.
  const bookingDetails = location.state?.bookingDetails;

  // --- Conditional Rendering ---
  // If for some reason the user lands on this page without booking details, show an error.
  if (!bookingDetails) {
    return (
      <div className="auth-page" style={{textAlign: 'center'}}>
        <h2>Oops! Something went wrong.</h2>
        <p>We couldn't find your booking details. Please try booking again.</p>
        <Link to="/" className="nav-btn" style={{marginTop: '2rem'}}>Back to Home</Link>
      </div>
    );
  }

  // --- JSX to Render the Confirmation ---
  // If bookingDetails exist, show the success message and summary.
  return (
    <div className="auth-page">
      <div className="auth-form-container" style={{textAlign: 'center'}}>
        <BsCheckCircleFill style={{ fontSize: '4rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
        
        <h2 style={{marginBottom: '0.5rem'}}>Booking Confirmed!</h2>
        <p style={{color: 'var(--text-secondary)', marginBottom: '2rem'}}>
            Your service request has been received. A professional will be assigned shortly.
        </p>
        
        {/* Booking Summary Box */}
        <div style={{ textAlign: 'left', background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <h4 style={{marginTop: 0, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem'}}>Booking Summary</h4>
            <p><strong>Service:</strong> {bookingDetails.service_name}</p>
            <p><strong>Name:</strong> {bookingDetails.customer_name}</p>
            <p><strong>Date:</strong> {new Date(bookingDetails.booking_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'})}</p>
            <p><strong>Time:</strong> {bookingDetails.booking_time}</p>
            <p><strong>Address:</strong> {bookingDetails.address}</p>
            <p><strong>Payment Method:</strong> {bookingDetails.payment_method}</p>
        </div>
        
        <Link to="/" className="nav-btn">Back to Home</Link>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;