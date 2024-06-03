import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Trip() {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({});
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/backend/trip/get_trips.php')
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  }, []);

  const addTrip = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newTrip) {
      formData.append(key, newTrip[key]);
    }

    axios.post('http://localhost/backend/trip/add_trip.php', formData)
      .then(response => {
        setTrips([...trips, response.data]);
        setNewTrip({});
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding trip:', error);
      });
  };

  const updateTrip = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in editingTrip) {
      formData.append(key, editingTrip[key]);
    }

    axios.post('http://localhost/backend/trip/edit_trip.php', formData)
      .then(response => {
        setTrips(trips.map(trip => trip.id === editingTrip.id ? response.data : trip));
        setEditingTrip(null);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating trip:', error);
      });
  };

  const deleteTrip = (id) => {
    axios.delete(`http://localhost/backend/trip/delete_trip.php?del_trip=${id}`)
      .then(() => {
        setTrips(trips.filter(trip => trip.id !== id));
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting trip:', error);
      });
  };

  return (
    <div>
      <form className="add-trip-form" method='post' encType='multipart/form-data' onSubmit={addTrip}>
        <input
          type="text"
          placeholder="Title"
          value={newTrip.title || ''}
          onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTrip.description || ''}
          onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Distance"
          value={newTrip.distance || ''}
          onChange={(e) => setNewTrip({ ...newTrip, distance: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newTrip.price || ''}
          onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration"
          value={newTrip.duration || ''}
          onChange={(e) => setNewTrip({ ...newTrip, duration: e.target.value })}
        />
        <input
          type="file"
          placeholder="Image"
          onChange={(e) => setNewTrip({ ...newTrip, image_url: e.target.files[0] })}
        />
        <button type="submit">Add Trip</button>
      </form>
      {editingTrip && (
        <form className="edit-trip-form" method='post' encType='multipart/form-data' onSubmit={updateTrip}>
          <h2>Edit Trip</h2>
          <input
            type="text"
            placeholder="Title"
            value={editingTrip.title || ''}
            onChange={(e) => setEditingTrip({ ...editingTrip, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={editingTrip.description || ''}
            onChange={(e) => setEditingTrip({ ...editingTrip, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Distance"
            value={editingTrip.distance || ''}
            onChange={(e) => setEditingTrip({ ...editingTrip, distance: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={editingTrip.price || ''}
            onChange={(e) => setEditingTrip({ ...editingTrip, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Duration"
            value={editingTrip.duration || ''}
            onChange={(e) => setEditingTrip({ ...editingTrip, duration: e.target.value })}
          />
          <input
            type="file"
            placeholder="Image"
            onChange={(e) => setEditingTrip({ ...editingTrip, image_url: e.target.files[0] })}
          />
          <button type="submit">Update Trip</button>
          <button onClick={() => setEditingTrip(null)}>Cancel</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Distance</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.title}</td>
              <td>{trip.description}</td>
              <td>{trip.distance}</td>
              <td>{trip.price}</td>
              <td>{trip.duration}</td>
              <td><img src={`http://localhost/Travel-Web-Site/src/${trip.image_url}`} alt={trip.title} width="50" /></td>
              <td className='buttons'>
                <button onClick={() => setEditingTrip(trip)}>Edit</button>
                <button onClick={() => deleteTrip(trip.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trip;
