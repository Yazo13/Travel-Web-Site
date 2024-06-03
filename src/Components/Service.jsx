import React, { useState, useEffect } from "react";
import Classes from "../Styles/Services.module.css";
import axios from 'axios';
import serviceIcon1 from "../assets/service1.png";
import serviceIcon2 from "../assets/service2.png";
import serviceIcon3 from "../assets/service3.png";
import serviceIcon4 from "../assets/service4.png";

function Service() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/backend/a_services/get_service.php')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  const serviceIcons = [serviceIcon1, serviceIcon2, serviceIcon3, serviceIcon4];

  return (
      <>  
      <div className="title">
        <h1>Service</h1>
      </div>
    <section id="service" className={Classes.service}>
      {services.map((item, index) => (
        <div key={index} className={Classes.services}>
          <div className={Classes.icon}>
            <img src={serviceIcons[index % serviceIcons.length]} alt="Service Icon" />
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </section></>
  );
}

export default Service;
