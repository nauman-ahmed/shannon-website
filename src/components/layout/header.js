import React from "react";
import { Link } from "react-router-dom";
const images = window.location.origin + "/assets/images";
function Header(props) {
  return (
    <div className="menu wf-section">
      <div className="containerhome f">
        <div
          data-animation="default"
          data-collapse="medium"
          data-duration="400"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar w-nav"
          style={{ marginLeft: -35 }}
        >
          <div className="container w-container d-inline">
            <Link
              to="/"
              aria-current="page"
              className="brand w-nav-brand w--current"
            >
              <img
                src={images + "/Frame.svg"}
                loading="lazy"
                alt=""
                className="logov2"
              />
            </Link>
            <nav role="navigation" className="navmenu w-nav-menu">
              <span>
                <Link
                  to="/"
                  aria-current="page"
                  className={
                    "navlink v2 w-nav-link " +
                    (!props.aciveBtn ? "w--current" : "")
                  }
                >
                  ARTISTS
                </Link>
                <Link
                  to="/divisions"
                  className={
                    "navlink v2 w-nav-link " +
                    (props.aciveBtn === "divisions" ? "w--current" : "")
                  }
                >
                  DIVISIONS
                </Link>
                <Link
                  to="/about"
                  className={
                    "navlink v2 w-nav-link " +
                    (props.aciveBtn === "about" ? "w--current" : "")
                  }
                >
                  ABOUT
                </Link>
                <Link
                  to="/contact"
                  className={
                    "navlink v2 w-nav-link " +
                    (props.aciveBtn === "contact" ? "w--current" : "")
                  }
                >
                  CONTACT
                </Link>
              </span>
              <div className="menuinfo v2">
                INFO@SHANNONASSOCIATES.COM • 212.333.2251
              </div>
            </nav>
            <div className="menu-button w-nav-button">
              <Link to="#" className="w-inline-block">
                <img src={images + "/menu.svg"} loading="lazy" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
