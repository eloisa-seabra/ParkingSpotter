import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loadProfile } from "../../services/profile";
import { deleteSingleParking } from "../../services/parking";
import ListItemReservations from "../../components/ListItemReservations/Index";
import LastReservations from "../../components/LastReservations/Index";
import ListMySpots from "../../components/ListMySpots/Index";
import "../../styles/_profile.scss";

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      ownParkings: [],
      activeRentals: [],
      rental: null,
    };
  }

  componentDidMount() {
    this.handleLoadProfile();
  }

  handleLoadProfile = (thing) => {
    loadProfile()
      .then((data) => {
        const user = this.props.user;
        const parkings = data.document.parking;
        const rentals = data.document.rental;

        this.setState({
          user,
          ownParkings: parkings,
          activeRentals: rentals,
          rental: thing,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleParkingDeletion = (index) => {
    const id = this.state.ownParkings[index]._id;

    deleteSingleParking(id)
      .then(() => {
        this.handleLoadProfile();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleRentalFinish = (index) => {
    const activeRentals = this.state.activeRentals.filter(function(rental) {
      return rental.status === "rented";
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
      totalAmount,
    };
  };

  render() {
    const user = this.state.user;
    const parkings = this.state.ownParkings;
    const rentals = this.state.activeRentals;
    const activeRentals = rentals.filter(function(rental) {
      return rental.status === "rented";
    });
    const endedRentals = rentals.filter(function(rental) {
      return rental.status === "ended";
    });

    return (
      <div>
        {this.state.loaded && (
          <>
            <div className="profile-div">
              <h2 className="h2-profile">
                <strong>Welcome {user.name}!</strong>
              </h2>
              <h4>Email: {user.email}</h4>
              <Link to="/profile/edit">Edit Profile</Link>
              <hr />

              <h3 className="h3-blue">My Current Rentals:</h3>
            </div>
            {(activeRentals.length && (
              <>
                {activeRentals.map((rental, index) => (
                  <div key={rental._id}>
                    <ListItemReservations rental={rental} rentedTime={this.rentedTime} />
                    <button className="profie-div" onClick={() => this.handleRentalFinish(index)}>
                      End Rental
                    </button>
                  </div>
                ))}
              </>
            )) || <p>You have no parking spots to rent.</p>}
            <hr />
            <h3 className="profile-div h3-blue">My Rental History:</h3>
            {(endedRentals.length && (
              <>
                {endedRentals.map((rental, index) => (
                  <div key={rental._id}>
                    <LastReservations rental={rental} rentedTime={this.rentedTime} />
                    <Link className="profie-div" to={`/parking/${rental.parking._id}`}>
                      Rent again
                    </Link>
                  </div>
                ))}
              </>
            )) || <p>You haven't rented any parking spots.</p>}
            <div className="own-parkings">
              <hr />
              <h3 className="profile-div h3-blue">My Parking Spots:</h3>
              {(this.state.ownParkings.length && (
                <>
                  {parkings.map((parking, index) => (
                    <div key={parking._id}>
                      <ListMySpots parking={parking} />
                      <div className="profile-div">
                        <Link to={`/parking/${parking._id}`}>Details </Link>
                        <Link to={`/parking/${parking._id}/edit`}>Edit Parking</Link>
                      </div>
                      <button className="profile-div" onClick={() => this.handleParkingDeletion(index)}>
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
