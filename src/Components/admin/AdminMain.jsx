import React, { useState } from 'react';
import User from './blocks/User';
import Trip from './blocks/Trip';
import Role from './blocks/Role';
import Booking from './blocks/Booking';
import Navbar from './Navbar';
import Feedback from './blocks/Feedback'
import Service from './blocks/Service'
import "./styles/Main.css";

function AdminPanel() {
  const [activeComponent, setActiveComponent] = useState('User');

  const renderComponent = () => {
    switch(activeComponent) {
      case 'User':
        return <User />;
      case 'Trip':
        return <Trip />;
      case 'Role':
        return <Role />;
      case 'Booking':
        return <Booking />;
      case 'Feedback':
        return <Feedback />;
        case 'Service':
        return <Service />;
      default:
        return <User />;
    }
  };

  return (
    <div className='nav-list'>
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="component-container">
        {renderComponent()}
      </div>
      <footer className='footer'>
        <p>Copyright © <span style={{color:'orange'}}>Gargari</span></p>
      </footer>
    </div>
  );
}

export default AdminPanel;
