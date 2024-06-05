import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/role.css";

function Role() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '' });
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/backend/role/get_role.php')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const addRole = (e) => {
    e.preventDefault();

    axios.post('http://localhost/backend/role/add_role.php', newRole)
      .then(response => {
        setRoles([...roles, response.data]);
        setNewRole({ name: '' });
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding role:', error);
      });
  };

  const updateRole = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost/backend/role/edit_role.php', editingRole)
      .then(response => {
        setRoles(roles.map(role => role.id === editingRole.id ? response.data : role));
        setEditingRole(null);
      })
      .catch(error => {
        console.error('Error updating role:', error);
      });
  };
  
  const deleteRole = (id) => {
    axios.delete(`http://localhost/backend/role/delete_role.php?del_role=${id}`)
      .then(() => {
        setRoles(roles.filter(role => role.id !== id));
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting role:', error);
      });
  };

  return (
    <div>
      <h1 style={{fontStyle: 'italic', marginTop: '10px'}}>Role Table</h1>
      <form className="add-role-form" onSubmit={addRole}>
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ name: e.target.value })}
        />
        <button type="submit">Add Role</button>
      </form>
      {editingRole && (
        <>
          <h2>Edit Role</h2>
          <form className="edit-role-form" onSubmit={updateRole}>
            <input
              type="text"
              placeholder="Role Name"
              value={editingRole.name}
              onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
            />
            <button type="submit">Update Role</button>
            <button onClick={() => setEditingRole(null)}>Cancel</button>
          </form>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td className='buttons'>
                <button onClick={() => setEditingRole(role)}>Edit</button>
                <button onClick={() => deleteRole(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Role;
