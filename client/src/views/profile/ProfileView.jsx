import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from '../../services/profile';
import { deleteSingleParking } from '../../services/parking';
import { endRental } from '../../services/rental';
import ListItemReservations from '../../components/ListItemReservations/Index';
import ListMySpots from '../../components/ListMySpots/Index';

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      ownParkings: [],
      reservations: [],
      rental: null
    };
  }

  componentDidMount() {
    this.handleLoadProfile();
  }

  handleLoadProfile = thing => {
    loadProfile()
      .then(data => {
        // console.log('this comes from backend: ', data);
        // console.log('this comes from state: ', this.props.user);
        const user = this.props.user;
        const parkings = data.document.parking;
        const rentals = data.document.rental;

        // console.log('parkings', data.document.parking);
        // console.log('rentals', data.document.rental);
        this.setState({
          user,
          ownParkings: parkings,
          reservations: rentals,
          rental: thing,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCheckOut = index => {
    // this.props.history.push('/');
  };

  handleParkingDeletion = index => {
    const id = this.state.ownParkings[index]._id;

    deleteSingleParking(id)
      .then(() => {
        this.handleLoadProfile();
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleRentalFinish = index => {
    const activeRentals = this.state.reservations.filter(function(rental) {
      return rental.status === 'rented';
    });

    const rental = activeRentals[index];
    const id = activeRentals[index]._id;
    const start = activeRentals[index].startedAt;
    const end = activeRentals[index].changedAt;
    const body = { rental, start, end };
    // console.log('id', id);

    endRental(id, body)
      .then(response => {
        console.log(response.body.rental);
        const rental = response.body.rental;
        this.handleLoadProfile(rental);
      })
      .catch(error => {
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

  rentalAMount = (price, time) => {};

  render() {
    const user = this.state.user;
    const parkings = this.state.ownParkings;
    const rentals = this.state.reservations;
    const activeRentals = rentals.filter(function(rental) {
      return rental.status === 'rented';
    });

    return (
      <div>
        {this.state.loaded && (
          <>
            <p>
              <strong>Welcome {user.name}!</strong>
            </p>
            <p>Email: {user.email}</p>
            <Link to="/profile/edit">Edit Profile</Link>
            <hr />
            <h4>My reservations:</h4>
            {(activeRentals.length && (
              <>
                {activeRentals.map((rental, index) => (
                  <div key={rental._id}>
<<<<<<< HEAD
                    <img src={rental.parking.photo} alt={rental.parking.location} />
                    <h5>Location: {rental.parking.location}</h5>
                    <p>Price: {rental.parking.price}€/hr</p>
                    <p>
                      Rented for: {this.rentalTime(0, rental.startedAt).hours} hours and {this.rentalTime(0, rental.startedAt).minutes} minutes
                    </p>
                    <p>Total Price: {this.rentalTime(rental.price, rental.startedAt).totalAmount} €</p>
                    <Link to={`/rental/${rental._id}`} rental={this.state.rental}>
                      End Rental
                    </Link>
                    <button onClick={() => this.handleRentalFinish(index)}>End Rental</button>
=======
                    <ListItemReservations rental={rental.parking} />
                    <button onClick={() => this.handleRentalFinish(index)}>
                      End Rental
                    </button>
>>>>>>> 8a673951aef5370e7b33fbc39674b9cb0204fe9d
                  </div>
                ))}
              </>
            )) || <p>You have no parking spots to rent.</p>}
            <hr />
            <h4>My last rentals:</h4>
            <p>array.map of past rentals</p>
            <div className="own-parkings">
              <hr />
              <h4>My spots:</h4>
              {(this.state.ownParkings.length && (
                <>
                  {parkings.map((parking, index) => (
                    <div key={parking._id}>
                      <ListMySpots parking={parking} />
                      <Link to={`/parking/${parking._id}`}>Details </Link>
                      <Link to={`/parking/${parking._id}/edit`}>
                        Edit Parking
                      </Link>
                      <button onClick={() => this.handleParkingDeletion(index)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </>
              )) || <p>You have no parking spots to rent.</p>}
            </div>
          </>
        )}
      </div>
    );
  }
}
export default ProfileView;
