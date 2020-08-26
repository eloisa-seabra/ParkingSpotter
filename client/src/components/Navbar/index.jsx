import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Navbar = (props) => {
  return (
    <nav>
      <Link to="/">
        {" "}
        <img
          style={{ width: "40px" }}
          src="https://res.cloudinary.com/isaseabra/image/upload/v1598217378/kissclipart-binocular-icon-clipart-computer-icons-clip-art-ceff16c01508c9b9_ujwlun.png"
          alt="binoculars-logo"
        />{" "}
        ParkingSpotter
      </Link>
      <Link to="/parking/create">Add your parking spot</Link>
      {(props.user && (
        <>
          <Link to="/profile">{props.user.name}</Link>
          <button onClick={props.onSignOut}>Sign Out</button>
        </>
      )) || (
        <>
          <Link to="/authentication/sign-up">Sign Up</Link>
          <Link to="/authentication/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
