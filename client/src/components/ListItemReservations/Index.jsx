import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

export const ListItemReservations = props => {
  console.log(props);
  return (
    <div className="list-item">
      <img src={props.rental.parking.photo} alt="image" />
      <div className="list-details">
        <h3>{props.rental.parking.location}</h3>
        <p>
          {' '}
          Rented for: {props.rentalTime(0, props.rental.startedAt).hours} hours
          and {props.rentalTime(0, props.rental.startedAt).minutes} minutes
        </p>
      </div>
      <div>
        <h2 className="price-hour">{props.rental.parking.price}€/hr</h2>
        <strong>Total Price: {'  '}</strong>
        <strong className="total-price">
          {
            props.rentalTime(props.rental.price, props.rental.startedAt)
              .totalAmount
          }{' '}
          €{' '}
        </strong>
      </div>
      {/*   <div className="reserve">
        <div className="reserve-details">
    
        </div>
      </div> */}
    </div>
  );
};

export default ListItemReservations;
