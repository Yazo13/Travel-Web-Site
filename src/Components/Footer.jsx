import React from "react";

import Classes from "../Styles/Footer.module.css";
import footerLogo from "../assets/GarGari_Logo.jpg";

import facebook from "../assets/facebook.svg";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";

function Footer() {
  return (
    <footer className={Classes.footerContainer}>
      <div className={Classes.footer}>
        <div className={Classes.socialLink}>
          <p>+995 555 64 53 19</p>
          <p>giorgi.kazishvili@gau.edu.ge</p>
          <a href="#">
            <img src={facebook} alt="" />
          </a>
          <a href="#">
            <img src={linkedin} alt="" />
          </a>
          <a href="https://github.com/Yazo13  ">
            <img src={github} alt="" />
          </a>
        </div>

        <div className={Classes.footerLogo}>
          <a href="#hero">
            <img src={footerLogo} alt="" />
            <p>
              Yazo <span>Travels</span>
            </p>
          </a>
        </div>

        <div className={Classes.footerInfo}>
          <h3>Explore the world from your inbox</h3>
          <p>
            let us inspire your next gateway with new destinations and special
            deals
          </p>

          <div>
            <input type="email" placeholder="email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
