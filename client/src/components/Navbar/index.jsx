import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Navbar = (props) => {
  return (
    <nav>
      <Link to="/">ParkingSpotter</Link>
      <Link to="/parking/create">Add a new slot</Link>
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
