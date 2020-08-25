import React, { Component } from 'react';
import { createNewRental } from '../../services/rental';

import CheckoutForm from '../../components/CheckoutForm/Index';
import ListItemReservations from '../../components/ListItemReservations/Index';

class PaymentView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      ownParkings: [],
      reservations: []
    };
  }

  render() {
    return (
      <div>
        <h2>Your Reservation</h2>
        <ListItemReservations rental={this.state.reservations} />
        <h4>Total: (pass property to show the total price)</h4>
        <h2>Please insert your payment details</h2>
        <CheckoutForm onCheckout={this.handleCheckout} />
      </div>
    );
  }
}

export default PaymentView;
