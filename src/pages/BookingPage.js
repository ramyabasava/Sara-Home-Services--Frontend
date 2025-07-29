import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal'; // <-- IMPORT THE MODAL
import upiQrCodeImage from '../assests/upi.jpg'; // <-- IMPORT THE QR IMAGE

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // --- State Hooks ---
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Page management state
  const [service, setService] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // NEW: State to control the UPI QR code modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Data Fetching Effect ---
  useEffect(() => {
    // (This part remains unchanged)
    axios.get(`${API_BASE_URL}/services/${serviceId}`)
      .then(response => { setService(response.data); setIsLoading(false); })
      .catch(err => { console.error(err); setError('Could not fetch service.'); setIsLoading(false); });
  }, [serviceId]);

  // --- Core Booking Logic ---
  const finalizeBooking = async () => {
    // This function contains the actual API call.
    // It will be called by either the main submit handler or the modal.
    if (!user || !serviceId || !customerName || !address || !bookingDate || !bookingTime || !paymentMethod) {
        setError("All fields are required to finalize the booking.");
        return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/bookings`, {
        user_id: user.id,
        service_id: parseInt(serviceId),
        customer_name: customerName,
        address: address,
        booking_date: bookingDate,
        booking_time: bookingTime,
        payment_method: paymentMethod,
      });

      // On success, navigate to the confirmation page
      navigate('/booking-confirmation', { state: { bookingDetails: response.data.booking_details } });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
      setIsModalOpen(false); // Close modal on error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check for payment method selection
    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }

    // --- NEW LOGIC ---
    // If user chose UPI, open the modal instead of calling the API directly
    if (paymentMethod === 'UPI') {
      setIsModalOpen(true);
    } else {
      // If user chose Cash on Delivery, proceed to book immediately
      finalizeBooking();
    }
  };

  // --- Render Logic ---
  if (isLoading) return <div className="auth-page"><h2>Loading...</h2></div>;
  if (!service) return <div className="auth-page"><h2>{error || "Service not found."}</h2></div>;
  
  return (
    <>
      {/* The QR Code Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Scan to Pay via UPI</h3>
        <img src={upiQrCodeImage} alt="UPI QR Code" style={{ maxWidth: '250px', margin: '1rem auto' }} />
        <p>After completing the payment, click the button below to confirm your booking.</p>
        <button className="nav-btn" onClick={finalizeBooking}>
          I Have Paid, Confirm Booking
        </button>
      </Modal>

      {/* The Booking Page Form */}
      <div className="auth-page">
        <div className="auth-form-container" style={{maxWidth: '500px'}}>
          <h2>Book Service: {service.name}</h2>
          {/* ... description ... */}
          {error && <p className="error-message">{error}</p>}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* ... all input fields remain the same ... */}
            <input type="text" placeholder="Your Full Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
            <input type="text" placeholder="Your Full Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
            <input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required />

            <div className="payment-options">
              <h4>Select Payment Method</h4>
              <label>
                <input type="radio" name="payment" value="UPI" onChange={e => setPaymentMethod(e.target.value)} />
                UPI / Net Banking
              </label>
              <label>
                <input type="radio" name="payment" value="Cash on Delivery" onChange={e => setPaymentMethod(e.target.value)} />
                Cash on Delivery
              </label>
            </div>
            
            <button type="submit">Proceed to Confirm</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingPage;