import React, { Component } from "react";
import { loadRental, endRental, submitPayment } from "../../services/rental";

import CheckoutForm from "../../components/CheckoutForm/Index";
import ListItemReservations from "../../components/ListItemReservations/Index";

class PaymentView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      rental: null,
    };
  }

  componentDidMount() {
    loadRental().then((data) => {
      const rentals = data.rentals;
      const rentalId = this.props.match.params.id;
      const rental = rentals.find(function(rent) {
        return rent._id === rentalId;
      });
      this.setState({
        rental,
        loaded: true,
      });
    });
  }

  handleCheckout = ({ token, address }) => {
    const id = this.props.match.params.id;
    const rental = this.state.rental;
    const start = rental.startedAt;
    const body = { rental, start };
    const payment = { token, address };

    endRental(id, body)
      .then((response) => {
        const rental = response.body.rental;
        this.setState({
          rental,
        });
      })
      .then(() => {
        return submitPayment(payment);
      })
      .then((response) => {
        console.log("got to the very end", response);
        this.props.history.push(`/profile`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  rentalTime = (price, time) => {
    const startingTime = Date.parse(time);
    const nowTime = Date.now();

    const durationTimeUnix = nowTime - startingTime;
    const hours = durationTimeUnix / 1000 / 60 / 60;
    const hoursAmount = Math.floor(durationTimeUnix / 1000 / 60 / 60);
    const minutesAmount = Math.ceil((hours - hoursAmount) * 60);
    const totalMinutes = Math.ceil(durationTimeUnix / 1000 / 60);

    const totalAmount = Math.round((price / 4) * Math.ceil(totalMinutes / 15) * 100) / 100;

    return { hours: hoursAmount, minutes: minutesAmount, totalMinutes, totalAmount };
  };

  render() {
    const rental = this.state.rental;
    return (
      <div>
        {this.state.loaded && (
          <>
            <h2>Your Reservation</h2>
            <ListItemReservations rentalTime={this.rentalTime} rental={this.state.rental} />
            <h4>Total: {this.rentalTime(rental.price, rental.startedAt).totalAmount} €</h4>
            <h2>Please insert your payment details</h2>
            <CheckoutForm onCheckout={this.handleCheckout} />
          </>
        )}
      </div>
    );
  }
}

export default PaymentView;
