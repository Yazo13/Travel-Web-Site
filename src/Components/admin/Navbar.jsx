import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/Navbar.css"
import { faBars, faClose, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
    const [user, setUser] = useState(null);
    const [toggle, setToggle] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.reload()
    };
    useEffect(() => {
        const signedInUser = localStorage.getItem('user');
        if (signedInUser) {
          setUser(JSON.parse(signedInUser));
        }
      }, []);

  return (
    <>
      <nav className="Navbar">
          <div className="brand">
            <a href="\" className="NavLogo" onClick={() => window.location.reload()}>
              Yazo <span>Travels</span>
            </a>
            <div className="hamburger">
              {toggle ? (
                <FontAwesomeIcon
                  icon={faClose}
                  className="menuIcon"
                  onClick={() => setToggle(false)}
                />
              ) : (
                <FontAwesomeIcon
                  className="menuIcon"
                  icon={faBars}
                  onClick={() => setToggle(true)}
                />
              )}
            </div>
          </div>
        <ul className={`${toggle ? Classes.open : ""}`}>
          <li>
            <a href="#hero" className="active">
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
        <div className="userBox">
          {user ? (
            <>
              <p>{user.Username}</p>
              <p>|</p>
              <a className="btn" onClick={handleSignOut}>Sign Out</a>
            </>
          ) : ''}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
