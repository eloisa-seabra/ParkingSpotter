import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

export const ListItemReservations = props => {
  return (
    <div className="list-item">
      <img src={props.rental.photo} alt={props.rental.location} />
      <div className="list-details">
        <h3>{props.rental.location}</h3>
        <h3>{props.rental.price}/hr</h3>
        <p>{props.rental.description}</p>
      </div>
      {/*   <div className="reserve">
        <div className="reserve-details">
          <button onClick={() => props.handleRentalFinish(props.index)}>
            End Rental
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ListItemReservations;
