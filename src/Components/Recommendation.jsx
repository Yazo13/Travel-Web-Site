import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../Styles/Recommendation.css";  

function Recommendation() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/backend/trip/get_trips.php');
        setTrips(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="recommendation" className="recommendation">
      <div className="title" >
        <h1>Recommend</h1>
      </div>

      <div className="recommendationBox">
        {trips.map((trip) => (
          <div className="box" key={trip.id}>
             <div className="image">
                <img src={trip.Image_url} alt="image" />
              </div>
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>

            <div className="price">
              <p>{trip.price} $</p>
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
