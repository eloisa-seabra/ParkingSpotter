import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

export const Marker = (props) => {
  return (
    <Link to={`/parking/${props.id}`}>
      <div className="marker">{props.price && <span>{props.price}/hr</span>}</div>
    </Link>
  );
};

export default Marker;
