import React, { Component } from 'react';
import { loadRental, endRental } from '../../services/rental';

import CheckoutForm from '../../components/CheckoutForm/Index';
import ListItemReservations from '../../components/ListItemReservations/Index';

class PaymentView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      rental: null
    };
  }

  componentDidMount() {
    loadRental().then(data => {
      const rentals = data.rentals;
      const rentalId = this.props.match.params.id;
      const rental = rentals.find(function(rent) {
        return rent._id === rentalId;
      });
      this.setState({
        rental,
        loaded: true
      });
    });
  }

  handleCheckout = () => {
    const id = this.props.match.params.id;
    const rental = this.state.rental;
    const start = rental.startedAt;
    const body = { rental, start };

    endRental(id, body)
      .then(response => {
        const rental = response.body.rental;
        this.setState({
          rental
        });
        this.handleLoadProfile(rental);
      })
      .then(() => {
        this.props.history.push(`/profile`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  rentedTime = (price, timeStart, timeEnd) => {
    const startingTime = Date.parse(timeStart);
    const endingTime = Date.parse(timeEnd);
    const durationTimeUnix = endingTime - startingTime;

    const hours = durationTimeUnix / 1000 / 60 / 60;
    const hoursAmount = Math.floor(durationTimeUnix / 1000 / 60 / 60);
    const minutesAmount = Math.ceil((hours - hoursAmount) * 60);
    const totalMinutes = Math.ceil(durationTimeUnix / 1000 / 60);

    const totalAmount = Math.round((price / 4) * Math.ceil(totalMinutes / 15) * 100) / 100;

    return {
      hours: hoursAmount,
      minutes: minutesAmount,
      totalMinutes,
      totalAmount
    };
  };

  render() {
    const rental = this.state.rental;
    console.log(rental);
    return (
      <div>
        {this.state.loaded && (
          <>
            <h2>Your Reservation</h2>
            <ListItemReservations rentedTime={this.rentedTime} rental={this.state.rental} />
            <h4>Total: {this.rentedTime(rental.price, rental.startedAt, Date()).totalAmount} €</h4>
            <h2>Please insert your payment details</h2>
            <CheckoutForm onCheckout={this.handleCheckout} />

            <button onClick={() => this.handleCheckout()}>Complete Purchase</button>
          </>
        )}
      </div>
    );
  }
}

export default PaymentView;
