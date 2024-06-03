import React, { useState, useEffect } from "react";
import Classes from "../Styles/Hero.module.css";
import Banner from "../assets/Main Photo.avif";

function Hero() {
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    Destination: "",
    date_in: "",
    date_out: ""
  });
  const [error, setError] = useState("");
  useEffect(() => {
    const signedInUser = localStorage.getItem("user");
    if (signedInUser) {
      setUser(JSON.parse(signedInUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setAlertModal(true);
      return;
    }

    const dataToSubmit = {
      ...formData,
      email: user.Email,
    };
    try {
      const response = await fetch("http://localhost/backend/booking.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();
      if (result.status === "success") {
        setModal(true);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      {modal && (
        <div className={Classes.modal}>
          <div className={Classes.modalContainer}>
            <h5>We received your information</h5>
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

      {error && (
        <div className={Classes.alertModal}>
          <div className={Classes.alertModalContainer}>
            <h5>Error</h5>
            <p>{error}</p>
            <button onClick={() => setError("")}>Ok</button>
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
          <form className={Classes.bookingContainer} onSubmit={handleSubmit}>
            <div className={Classes.search}>
              <label>Where you want to go</label>
              <input
                type="text"
                placeholder="Search your location"
                name="Destination"
                value={formData.Destination}
                onChange={handleChange}
              />
            </div>

            <div className={Classes.search}>
              <label>Check in</label>
              <input
                type="date"
                name="date_in"
                value={formData.date_in}
                onChange={handleChange}
              />
            </div>

            <div className={Classes.search}>
              <label>Check out</label>
              <input
                type="date"
                name="date_out"
                value={formData.date_out}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Book Now</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Hero;
