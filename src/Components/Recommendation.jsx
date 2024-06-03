import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../Styles/Recommendation.css";
import Destination1 from "../assets/Destination1.png";
import Destination2 from "../assets/Destination2.png";
import Destination3 from "../assets/Destination3.png";
import Destination4 from "../assets/Destination4.png";
import Destination5 from "../assets/Destination5.png";
import Destination6 from "../assets/Destination6.png";

function Recommendation() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/backend/get_trips.php');
        setTrips(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getImage = (id) => {
    switch (id) {
      case '1':
        return Destination1;
      case '2':
        return Destination2;
      case '3':
        return Destination3;
      case '4':
        return Destination4;
      case '5':
        return Destination5;
      case '6':
        return Destination6;
      default:
        return null;
    }
  };

  return (
    <section id="recommendation" className="recommendation">
      <div className="title">
        <h1>Recommend</h1>
      </div>

      <div className="recommendationBox">
        {trips.map((trip) => (
          <div className="box" key={trip.id}>
             <div className="image">
                <img src={trip.Image_url} alt="image" />
              </div>
            <h3>{trip.title}</h3>
            <p>{trip.subTitle}</p>

            <div className="price">
              <p>${trip.cost}</p>
            </div>

            <div className="details">
              <p>{trip.distance} kms</p>
              <p>{trip.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Recommendation;
