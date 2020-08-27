import React from 'react';
import './style.scss';

export const ListItemReservations = props => {
  return (
    <div className="list-item">
      <img src={props.rental.parking.photo} alt="image" />
      <div className="list-details">
        <h3>{props.rental.parking.location}</h3>
        <p>
          Rented for: {props.rentedTime(0, props.rental.startedAt, props.rental.endedAt).hours} hours and {props.rentedTime(0, props.rental.startedAt, props.rental.endedAt).minutes} minutes
        </p>
      </div>
      <div>
        <h2 className="price-hour">{props.rental.parking.price}€/hr</h2>
        <strong>Total Price: {'  '}</strong>
        <strong className="total-price">{props.rentedTime(props.rental.price, props.rental.startedAt, props.rental.endedAt).totalAmount} € </strong>
      </div>
    </div>
  );
};

export default ListItemReservations;
