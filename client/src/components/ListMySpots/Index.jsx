import React from 'react';
import './style.scss';

export const ListMySpots = props => {
  return (
    <div className="list-item">
      <img src={props.parking.photo} alt={props.parking.location} />
      <div className="list-details">
        <h3>{props.parking.location}</h3>
        <h3>{props.parking.price}/hr</h3>
        <p>{props.parking.description}</p>
      </div>
      <div>
        <div>
          {props.parking.isRented ? (
            <h3 className="reserve-details">Reserved</h3>
          ) : (
            <h3 className="reserve-details">Available</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListMySpots;
