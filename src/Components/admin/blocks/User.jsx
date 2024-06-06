import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/user.css";

function User() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/backend/user/get_users.php')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const addUser = () => {
    axios.post('http://localhost/backend/user/add_user.php', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({});
        window.location.reload()
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const updateUser = () => {
    axios.put('http://localhost/backend/user/edit_user.php', editingUser)
      .then(response => {
        setUsers(users.map(user => user.id === editingUser.id ? response.data : user));
        setEditingUser(null);
        window.location.reload()
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost/backend/user/add_user.php?del_user=${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        window.location.reload()
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h1 style={{fontStyle: 'italic', marginTop: '10px'}}>Role Table</h1>
      <div className="add-user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name || ''}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username || ''}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email || ''}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.user_role || ''}
          onChange={(e) => setNewUser({ ...newUser, user_role: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password || ''}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      {editingUser && (
        <>
          <h2>Edit User</h2>
        <div className="edit-user-form">
          <input
            type="text"
            placeholder="Name"
            value={editingUser.name || ''}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            value={editingUser.Username || ''}
            onChange={(e) => setEditingUser({ ...editingUser, Username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            value={editingUser.Email || ''}
            onChange={(e) => setEditingUser({ ...editingUser, Email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={editingUser.user_role || ''}
            onChange={(e) => setEditingUser({ ...editingUser, user_role: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={editingUser.password || ''}
            onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
          />
          <button onClick={updateUser}>Update User</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.Username}</td>
              <td>{user.Email}</td>
              <td>{user.user_role}</td>
              <td>{user.password}</td>
              <td className='buttons'>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
