import React, { useState, useEffect } from "react";
import Classes from "../Styles/Testimonials.module.css";
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Testimonials() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/backend/feedback/get_feedback.php')
      .then(response => {
        setFeedback(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  return (
    <section id="testimonials" className={Classes.testimonials}>
      <h1>Happy Customers</h1>

      <div className={Classes.boxContainer}>
        {feedback.map((item, index) => (
          <div key={index} className={Classes.testimonialBox}>
            <FontAwesomeIcon icon={faQuoteLeft} className={Classes.Icon} />
            <p style={{marginTop:'15px'}}>{item.description}</p>
            <div className={Classes.info}>
            <FontAwesomeIcon icon={faUserCircle} style={{width: '30px', height: '30px'}}/>
              <div>
                <h3>{item.name}</h3>
                <span>{item.Username}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
