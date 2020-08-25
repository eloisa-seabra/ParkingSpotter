import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

export const Marker = (props) => {
  return (
    <Link to={`/parking/${props.id}`}>
      <div className="marker">{props.price}/hr</div>
    </Link>
  );
};

export default Marker;
