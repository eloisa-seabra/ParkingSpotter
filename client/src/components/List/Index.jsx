import React from "react";
import ListItem from "../ListItem/Index";
import "./style.scss";

export const List = (props) => {
  return (
    <div>
      {props.items.map((item) => (
        <ListItem
          key={item._id}
          description={item.description}
          isRented={item.isRented}
          location={item.location}
          photo={item.photo}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default List;
