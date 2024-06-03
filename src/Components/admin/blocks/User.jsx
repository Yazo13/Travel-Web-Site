import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/user.css";

function User() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost/backend/user/get_users.php')
      .then(response => {
        setUsers(response.data);
        // console.log(response.data)
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
      })
      .catch(error => {
        // console.error('Error adding user:', error);
      });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost/backend/user/add_user.php?delete=${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
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
          type="text"
          placeholder="Password"
          value={newUser.password || ''}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={addUser}>Add User</button>
      </div>
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
              <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
