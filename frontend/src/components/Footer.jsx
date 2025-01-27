import React from "react";
import footer from "../assets/Koziza_Footer.png";
import forge from "../assets/Koziza_Forge.png";
import Logo from "../assets/Koziza Logo.png";
import { NavLink, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import "../App.css";
const Footer = () => {
  return (
    <footer>
      <img className="footer-img" src={footer} alt="" />
      <div className="footer-menu">
        <div className="footer-content">
          <img src={Logo} alt="" />
          <h2>Menu</h2>
          <ul>
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/products">
              <li>Product</li>
            </NavLink>
            <NavLink>
              <li>Privacy Policy</li>
            </NavLink>
            <NavLink>
              <li>Terms And Condition</li>
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">COPYRIGHT © 2025. ALL RIGHTS RESERVED</div>
      <div className="coder-img">
        <a
          target="_blank"
          href="https://www.linkedin.com/in/daksh-kaushal/"
          rel="noopener noreferrer"
        >
          <img src={forge} alt="" />

          <p>Made with love by @FORGE</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
