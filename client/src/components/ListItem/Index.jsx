import React from "react";
import "./style.scss";

export const List = (props) => {
  return (
    <div>
      <img src={props.photo} alt={props.location} />
      <div>
        <h4>Location: {props.location}</h4>
        <p>Price: {props.price}/hr</p>
        <p>Description: {props.description}</p>
        <button>Purchase Spot</button>
      </div>
    </div>
  );
};

export default List;
