import React, { useState, useEffect } from "react";
import axios from "axios";

import Classes from "../Styles/Footer.module.css";
import footerLogo from "../assets/GarGari_Logo.jpg";

import facebook from "../assets/facebook.svg";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";

function Footer() {
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [alertModal, setAlertModal] = useState(false);

  useEffect(() => {
    const signedInUser = localStorage.getItem("user");
    if (signedInUser) {
      setUser(JSON.parse(signedInUser));
    }
  }, []);

  const handleFeedbackSubmit = async () => {
    if (!user) {
      setAlertModal(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost/backend/feedback/add_feedback.php", {
        description,
        user_id: user.id
      });

      if (response.data.status === 'success') {
        setMessage("Feedback submitted successfully!");
        setDescription("");
      } else {
        setMessage("Error: " + response.data.message);
      }
    } catch (error) {
      setMessage("Error submitting feedback.");
      console.error(error);
    }
  };

  return (
    <footer className={Classes.footerContainer}>
      <div className={Classes.footer}>
        <div className={Classes.socialLink}>
          <p>+995 555 64 53 19</p>
          <p>giorgi.kazishvili@gau.edu.ge</p>
          <a href="#">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="#">
            <img src={linkedin} alt="LinkedIn" />
          </a>
          <a href="https://github.com/Yazo13">
            <img src={github} alt="GitHub" />
          </a>
        </div>

        <div className={Classes.footerLogo}>
          <a href="#hero">
            <img src={footerLogo} alt="Footer Logo" />
            <p>
              Yazo <span>Travels</span>
            </p>
          </a>
        </div>

        <div className={Classes.footerInfo}>
          <h4>Please Leave Feedback</h4>
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <button onClick={handleFeedbackSubmit}>Submit</button>
          {message && <p style={{marginTop: '10px'}}>{message}</p>}
        </div>

        {alertModal && (
          <div className={Classes.alertModal}>
            <div className={Classes.alertModalContainer}>
              <h3>Please sign in to leave feedback.</h3>
              <button onClick={() => setAlertModal(false)}>Ok</button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
