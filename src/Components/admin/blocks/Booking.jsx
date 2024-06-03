// BookingManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Booking() {
  // State for bookings
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from API
  useEffect(() => {
    axios.get('/api/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  // Render bookings in a table
  return (
    <div>
      <h3>Booking Management</h3>
      <table>
        <thead>
          <tr>
            <th>Destination</th>
            <th>Date In</th>
            <th>Date Out</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.destination}</td>
              <td>{booking.date_in}</td>
              <td>{booking.date_out}</td>
              <td>{booking.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booking;
