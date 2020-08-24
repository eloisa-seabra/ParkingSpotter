import React from 'react';
import ListItem from '../ListItem';

export const List = props => {
  console.log(props);
  return (
    <div>
      {props.items.map(item => (
        <ListItem key={item.text} details={item.text} />
      ))}
    </div>
  );
};

export default List;
