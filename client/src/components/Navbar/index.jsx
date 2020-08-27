import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse mx-5" id="navbarTogglerDemo01">
        <Link className="navbar-brand nav-text" to={'/'}>
          <img
            className="mr-3"
            style={{ width: '40px' }}
            src="https://res.cloudinary.com/isaseabra/image/upload/v1598217378/kissclipart-binocular-icon-clipart-computer-icons-clip-art-ceff16c01508c9b9_ujwlun.png"
            alt="binoculars-logo"
          />
          ParkingSpotter
        </Link>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {(props.user && (
            <>
              <li className="nav-item active">
                <Link className="nav-link" to="/parking/create">
                  Add your parking spot
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className=""
                  to="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="./user.webp"
                    className="user-image rounded-circle"
                    alt="user profile"
                  />
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  id="navbarSupportedContent"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/profile">
                    Your account
                  </Link>
                  <Link className="dropdown-item" to="/profile/edit">
                    Edit your profile
                  </Link>
                  <Link className="dropdown-item" to="/deal/history">
                    View your past trades
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="nav-link " onClick={props.onSignOut}>
                    Sign Out
                  </button>
                </div>
              </li>
            </>
          )) || (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/authentication/sign-up">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  id="cta-button"
                  className="nav-link"
                  to="/authentication/sign-in"
                >
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
