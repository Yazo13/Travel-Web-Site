import React, { useState, useEffect } from "react";
import Classes from "../Styles/Hero.module.css";
import Banner from "../assets/Main Photo.avif";

function Hero() {
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const signedInUser = localStorage.getItem('user');
    if (signedInUser) {
      setUser(JSON.parse(signedInUser));
    }
  }, []);

  const handleBookNow = () => {
    if (user) {
      setModal(true);
    } else {
      setAlertModal(true);
    }
  };

  return (
    <>
      {modal && (
        <div className={Classes.modal}>
          <div className={Classes.modalContainer}>
            <h5>We Received your information</h5>
            <button onClick={() => setModal(false)}>Ok</button>
          </div>
        </div>
      )}

      {alertModal && (
        <div className={Classes.alertModal}>
          <div className={Classes.alertModalContainer}>
            <h5>Please sign in to book a trip.</h5>
            <button onClick={() => setAlertModal(false)}>Ok</button>
          </div>
        </div>
      )}

      <section id="hero" className={Classes.heroContainer}>
        <div className={Classes.heroimage}>
          <img src={Banner} alt="Travel banner" />
        </div>

        <div className={Classes.content}>
          <div className={Classes.title}>
            <h1>
              Travel & Explore With{" "}
              <span className={Classes.nickName}>Yazo Travels</span>
            </h1>
            <p>
              Save at least 15% on stays worldwide, from relaxing retreats to
              off-grid adventures
            </p>
          </div>
          <div className={Classes.bookingContainer}>
            <div className={Classes.search}>
              <label>Where you want to go</label>
              <input type="text" placeholder="Search your location" />
            </div>

            <div className={Classes.search}>
              <label>Check in</label>
              <input type="date" />
            </div>

            <div className={Classes.search}>
              <label>Check out</label>
              <input type="date" />
            </div>

            <button onClick={handleBookNow}>Book Now</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
