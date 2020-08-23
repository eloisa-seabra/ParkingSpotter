import React from 'react';

const Price = ({ amount, currency }) => {
  const currencyIcons = {
    EUR: '€',
    USD: '$'
  };
  const symbol = currencyIcons[currency];

  return (
    <span className="price">{`${(amount / 100).toFixed(2)}${symbol}`}</span>
  );
};

export default Price;
