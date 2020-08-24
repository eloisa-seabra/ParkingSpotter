import React from 'react';
/* import './style.scss'; */
import { Link } from 'react-router-dom';

const ParkingSpot = props => {
  return (
    <div key={props.parking._id}>
      <h5>Location: {props.parking.location}</h5>
      <small>{props.parking.description}</small>
      <p>Price: {props.parking.price}$/hr</p>
      <Link to={`/parking/${props.parking._id}`}>Details </Link>
      <Link to={`/parking/${props.parking._id}/edit`}> Edit Parking </Link>
      <button onClick={() => props.handleParkingDeletion(props.index)}>
        Delete
      </button>
    </div>
  );
};

export default ParkingSpot;
