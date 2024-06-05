import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/service.css";

const AdminService = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: '', description: '' });
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios.get('http://localhost/backend/a_services/get_service.php')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  };

  const addService = (e) => {
    e.preventDefault();

    axios.post('http://localhost/backend/a_services/add_service.php', newService)
      .then(response => {
        setServices([...services, response.data]);
        setNewService({ title: '', description: '' });
      })
      .catch(error => {
        console.error('Error adding service:', error);
      });
  };

  const updateService = (e) => {
    e.preventDefault();

    axios.post('http://localhost/backend/a_services/edit_service.php', editingService)
      .then(response => {
        setServices(services.map(service => service.id === editingService.id ? response.data : service));
        setEditingService(null);
      })
      .catch(error => {
        console.error('Error updating service:', error);
      });
  };

  const deleteService = (id) => {
    axios.delete(`http://localhost/backend/a_services/delete_service.php?del_service=${id}`)
      .then(() => {
        setServices(services.filter(service => service.id !== id));
      })
      .catch(error => {
        console.error('Error deleting service:', error);
      });
  };

  return (
    <div className="admin-service-container">
      <h1>Manage Services</h1>
      <form className="add-service-form" onSubmit={addService}>
        <input
          type="text"
          placeholder="Title"
          value={newService.title}
          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <button type="submit">Add Service</button>
      </form>
      {editingService && (
        <>
          <h2>Edit Service</h2>
          <form className="edit-service-form" onSubmit={updateService}>
            <input
              type="text"
              placeholder="Title"
              value={editingService.title}
              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={editingService.description}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
            />
            <button type="submit">Update Service</button>
            <button onClick={() => setEditingService(null)}>Cancel</button>
          </form>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.title}</td>
              <td>{service.description}</td>
              <td className='buttons'>
                <button onClick={() => setEditingService(service)}>Edit</button>
                <button onClick={() => deleteService(service.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminService;
