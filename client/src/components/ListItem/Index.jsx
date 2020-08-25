import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

export const List = (props) => {
  return (
    <div className="list-item">
      <img src={props.photo} alt={props.location} />
      <div className="list-details">
        <h3>{props.location}</h3>
        <h3>{props.price}/hr</h3>
      </div>
      <div className="reserve">
        <button className="reserve-details">Purchase Spot</button>
      <div>
        <Link to={`/parking/${props.id}`} className="reserve">
          Purchase Spot
        </Link>
      </div>
    </div>
  );
};

export default List;
