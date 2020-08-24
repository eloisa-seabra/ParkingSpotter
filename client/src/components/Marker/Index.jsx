import React from "react";
import "./style.scss";

export const Marker = (props) => {
  return (
    <div key={props.text} className="marker">
      {props.text}
    </div>
  );
};

export default Marker;
