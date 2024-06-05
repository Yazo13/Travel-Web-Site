import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/Navbar.css";
import { faBars, faClose, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function NavBar({ setActiveComponent }) {
    const [user, setUser] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [activeLink, setActiveLink] = useState('User');

    const handleSignOut = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.reload();
    };

    useEffect(() => {
        const signedInUser = localStorage.getItem('user');
        if (signedInUser) {
            setUser(JSON.parse(signedInUser));
        }
    }, []);

    const handleLinkClick = (component) => {
        setActiveComponent(component);
        setActiveLink(component);
    };

    return (
        <>
            <nav className="Navbar">
                <div className="brand">
                    <a href="/" className="NavLogo" onClick={() => window.location.reload()}>
                      <span><h1>Admin Panel</h1></span>
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
                <ul className={`${toggle ? 'open' : ''}`}>
                    <li>
                        <a 
                            className={activeLink === 'User' ? 'active' : ''} 
                            onClick={() => handleLinkClick('User')}
                        >
                            User
                        </a>
                    </li>
                    <li>
                        <a 
                            className={activeLink === 'Role' ? 'active' : ''} 
                            onClick={() => handleLinkClick('Role')}
                        >
                            Role
                        </a>
                    </li>
                    <li>
                        <a 
                            className={activeLink === 'Booking' ? 'active' : ''} 
                            onClick={() => handleLinkClick('Booking')}
                        >
                            Booking
                        </a>
                    </li>
                    <li>
                        <a 
                            className={activeLink === 'Trip' ? 'active' : ''} 
                            onClick={() => handleLinkClick('Trip')}
                        >
                            Trip
                        </a>
                    </li>
                    <li>
                        <a 
                            className={activeLink === 'Feedback' ? 'active' : ''} 
                            onClick={() => handleLinkClick('Feedback')}
                        >
                            Feedback
                        </a>
                    </li>
                    <li>
                        <a 
                            className={activeLink === 'Service' ? 'active' : ''} 
                            onClick={() => handleLinkClick('Service')}
                        >
                            Service
                        </a>
                    </li>
                </ul>
                <div className="userBox">
                    {user ? (
                        <>
                            <p>Hello {user.Username} <span style={{color: "orange"}}>Admin</span></p>
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
