import React, { useState, useEffect } from "react";
import Classes from "../Styles/NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const [modali, setModali] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(''); // State variable for error message

  useEffect(() => {
    const signedInUser = localStorage.getItem('user');
    if (signedInUser) {
      setUser(JSON.parse(signedInUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isSignUp ? 'Sign_up.php' : 'Sign_in.php';
      const response = await axios.post(`http://localhost/backend/${endpoint}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Response:", response.data);

      if (response.data.status === 'success') {
        if (!isSignUp) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setUser(response.data.user);
        }
        setModali(false);
      } else {
        setError(response.data.message); // Set the error message
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      {modali && (
        <div className={Classes.modal}>
          <form onSubmit={handleSubmit} method="Post">
            <div className={Classes.modalContainer}>
              <h5>{isSignUp ? "Sign Up" : "Sign In"}</h5>
              {error && <p className={Classes.errorMessage}>{error}</p>} {/* Display error message */}
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              {isSignUp && <input type="text" name="username" placeholder="Username" onChange={handleChange} required />}
              {isSignUp && <input type="text" name="name" placeholder="Name" onChange={handleChange} required />}
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
              <button type="button" onClick={() => setModali(false)}>Cancel</button>
              <button
                type="button"
                className={Classes.toggleButton}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      )}

      <nav className={Classes.Navbar}>
        <div className={Classes.brand}>
          <a href="\" className={Classes.NavLogo} onClick={() => window.location.reload()}>
            Yazo <span>Travels</span>
          </a>
          <div className={Classes.hamburger}>
            {toggle ? (
              <FontAwesomeIcon
                icon={faClose}
                className={Classes.menuIcon}
                onClick={() => setToggle(false)}
              />
            ) : (
              <FontAwesomeIcon
                className={Classes.menuIcon}
                icon={faBars}
                onClick={() => setToggle(true)}
              />
            )}
          </div>
        </div>
        <ul className={`${toggle ? Classes.open : ""}`}>
          <li>
            <a href="#hero" className={Classes.active}>
              Home
            </a>
          </li>
          <li>
            <a href="#service">Services</a>
          </li>
          <li>
            <a href="#recommendation">Places</a>
          </li>
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>
        </ul>
        <div className={Classes.userBox}>
          {user ? (
            <>
              <p>{user.Username}</p>
              <p>|</p>
              <a className="btn" onClick={handleSignOut}>Sign Out</a>
            </>
          ) : (
            <>
              <a href="#signin" onClick={() => { setModali(true); setIsSignUp(false); }}>Sign In</a>
              <FontAwesomeIcon icon={faUserCircle} className={Classes.icon} />
              <a href="#signup" onClick={() => { setModali(true); setIsSignUp(true); }}>Sign Up</a>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
