import React from "react";

export const List = (props) => {
  return (
    <div>
      <div>
        <h4>Address: 1234 {props.details}</h4>
        <p>Price: 2$/hr</p>
        <button>Reserve Spot</button>
      </div>
    </div>
  );
};

export default List;
