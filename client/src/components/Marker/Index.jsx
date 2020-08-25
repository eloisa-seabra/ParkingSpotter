import React from "react";
import "./style.scss";

export const Marker = (props) => {
  return <div className="marker">{props.price}/hr</div>;
};

export default Marker;
