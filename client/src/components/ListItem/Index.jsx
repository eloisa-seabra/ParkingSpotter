import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

export const List = props => {
  return (
    <div className="list-item row">
      <div className="col-2">
        <img src={props.photo} alt={props.location} />
      </div>
      <div className="col-5 list-details">
        <p>{props.location}</p>
        <p>
          <small>{props.price}€/hr</small>
        </p>
      </div>
      <div>
        <div className="col-5">
          <Link to={`/parking/${props.id}`} className="reserve-details text-center">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default List;
