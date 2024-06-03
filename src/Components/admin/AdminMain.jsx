import React from 'react';
import ReactDOM from 'react-dom';
import User from './blocks/User';
import Trip from './blocks/Trip';
import Role from './blocks/Role';
import Booking from './blocks/booking';
import "./styles/Main.css"

function AdminPanel() {
  return (
    <div className='nav-list'>
      <h1>Admin Panel</h1>
      <h2>User Management</h2>
      <User />
      {/* <h2>Trip Management</h2>
      <Trip />
      <h2>Role Management</h2>
      <Role />
      <h2>Booking Management</h2>
      <Booking /> */}
    </div>
  );
}

ReactDOM.render(<AdminPanel />, document.getElementById('root'));
export default AdminPanel