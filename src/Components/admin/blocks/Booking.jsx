import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/booking.css";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ destination: '', date_in: '', date_out: '', email: '' });
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/backend/booking/get_booking.php')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const addBooking = (e) => {
    e.preventDefault();

    axios.post('http://localhost/backend/booking/add_booking.php', newBooking)
      .then(response => {
        setBookings([...bookings, response.data]);
        setNewBooking({ destination: '', date_in: '', date_out: '', email: '' });
        // window.location.reload();
      })
      .catch(error => {
        console.error('Error adding booking:', error);
      });
  };

  const updateBooking = (e) => {
    e.preventDefault();

    axios.post('http://localhost/backend/booking/edit_booking.php', editingBooking)
      .then(response => {
        setBookings(bookings.map(booking => booking.id === editingBooking.id ? response.data : booking));
        setEditingBooking(null);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating booking:', error);
      });
  };

  const deleteBooking = (id) => {
    axios.delete(`http://localhost/backend/booking/delete_booking.php?del_booking=${id}`)
      .then(() => {
        setBookings(bookings.filter(booking => booking.id !== id));
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  };

  return (
    <div>
      <h1 style={{fontStyle: 'italic', marginTop: '10px'}}>Booking Table</h1>
      <form className="add-booking-form" onSubmit={addBooking}>
        <input
          type="text"
          placeholder="Destination"
          value={newBooking.destination}
          onChange={(e) => setNewBooking({ ...newBooking, destination: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date In"
          value={newBooking.date_in}
          onChange={(e) => setNewBooking({ ...newBooking, date_in: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date Out"
          value={newBooking.date_out}
          onChange={(e) => setNewBooking({ ...newBooking, date_out: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newBooking.email}
          onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
        />
        <button type="submit">Add Booking</button>
      </form>
      {editingBooking && (
        <>
          <h2>Edit Booking</h2>
          <form className="edit-booking-form" onSubmit={updateBooking}>
            <input
              type="text"
              placeholder="Destination"
              value={editingBooking.destination}
              onChange={(e) => setEditingBooking({ ...editingBooking, destination: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date In"
              value={editingBooking.date_in}
              onChange={(e) => setEditingBooking({ ...editingBooking, date_in: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date Out"
              value={editingBooking.date_out}
              onChange={(e) => setEditingBooking({ ...editingBooking, date_out: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={editingBooking.email}
              onChange={(e) => setEditingBooking({ ...editingBooking, email: e.target.value })}
            />
            <button type="submit">Update Booking</button>
            <button onClick={() => setEditingBooking(null)}>Cancel</button>
          </form>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destination</th>
            <th>Date In</th>
            <th>Date Out</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.destination}</td>
              <td>{booking.date_in}</td>
              <td>{booking.date_out}</td>
              <td>{booking.email}</td>
              <td className='buttons'>
                <button onClick={() => setEditingBooking(booking)}>Edit</button>
                <button onClick={() => deleteBooking(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booking;
