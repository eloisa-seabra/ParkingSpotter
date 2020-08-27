import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from '../../services/profile';
import { deleteSingleParking } from '../../services/parking';
import ListItemReservations from '../../components/ListItemReservations/Index';
import LastReservations from '../../components/LastReservations/Index';
import ListMySpots from '../../components/ListMySpots/Index';

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      ownParkings: [],
      activeRentals: [],
      rental: null
    };
  }

  componentDidMount() {
    this.handleLoadProfile();
  }

  handleLoadProfile = thing => {
    loadProfile()
      .then(data => {
        const user = this.props.user;
        const parkings = data.document.parking;
        const rentals = data.document.rental;

        this.setState({
          user,
          ownParkings: parkings,
          activeRentals: rentals,
          rental: thing,
          loaded: true
        });

        console.log(this.state.activeRentals);
      })
      .catch(error => {
        console.log(error);
      });
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
    const activeRentals = this.state.activeRentals.filter(function(rental) {
      return rental.status === 'rented';
    });

    const rental = activeRentals[index];
    this.props.history.push(`/rental/${rental._id}`);
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
    const user = this.state.user;
    const parkings = this.state.ownParkings;
    const rentals = this.state.activeRentals;
    const activeRentals = rentals.filter(function(rental) {
      return rental.status === 'rented';
    });
    const endedRentals = rentals.filter(function(rental) {
      return rental.status === 'ended';
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
            <h4>My Current Rentals:</h4>
            {(activeRentals.length && (
              <>
                {activeRentals.map((rental, index) => (
                  <div key={rental._id}>
                    <ListItemReservations rental={rental} rentedTime={this.rentedTime} />
                    <button onClick={() => this.handleRentalFinish(index)}>End Rental</button>
                  </div>
                ))}
              </>
            )) || <p>You have no parking spots to rent.</p>}
            <hr />
            <h4>My last rentals:</h4>
            {(endedRentals.length && (
              <>
                {endedRentals.map((rental, index) => (
                  <div key={rental._id}>
                    <LastReservations rental={rental} rentedTime={this.rentedTime} />
                    <Link to={`/parking/${rental.parking._id}`}>Rent again</Link>
                  </div>
                ))}
              </>
            )) || <p>You haven't rented any parking spots.</p>}
            <div className="own-parkings">
              <hr />
              <h4>My spots:</h4>
              {(this.state.ownParkings.length && (
                <>
                  {parkings.map((parking, index) => (
                    <div key={parking._id}>
                      <ListMySpots parking={parking} />
                      <Link to={`/parking/${parking._id}`}>Details </Link>
                      <Link to={`/parking/${parking._id}/edit`}>Edit Parking</Link>
                      <button onClick={() => this.handleParkingDeletion(index)}>Delete</button>
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
