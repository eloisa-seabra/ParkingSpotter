import React from 'react';
import './style.scss';

export const ListItemReservations = props => {
  return (
    <div className="list-item">
      <img src={props.rental.parking.photo} alt="garage" />
      <div className="list-details">
        <h3>{props.rental.parking.location}</h3>
        <p>
          Rented for: {props.rentedTime(0, props.rental.startedAt, Date()).hours} hours and {props.rentedTime(0, props.rental.startedAt, Date()).minutes} minutes
        </p>
      </div>
      <div>
        <h2 className="price-hour">{props.rental.parking.price}€/hr</h2>
        <strong>Total Price: {'  '}</strong>
        <strong className="total-price">{props.rentedTime(props.rental.price, props.rental.startedAt, Date()).totalAmount} € </strong>
      </div>
    </div>
  );
};

export default ListItemReservations;
