// RoleManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Role() {
  // State for roles
  const [roles, setRoles] = useState([]);

  // Fetch roles from API
  useEffect(() => {
    axios.get('/api/roles')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  // Render roles in a table
  return (
    <div>
      <h3>Role Management</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Role;
