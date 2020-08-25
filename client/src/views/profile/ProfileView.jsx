import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from '../../services/profile';
import { deleteSingleParking } from '../../services/parking';

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      ownParkings: [],
      reservations: []
    };
  }

  componentDidMount() {
    this.handleLoadProfile();
  }

  handleLoadProfile = () => {
    loadProfile()
      .then(data => {
        // console.log('this comes from backend: ', data);
        // console.log('this comes from state: ', this.props.user);

        const user = this.props.user;
        const parkings = data.document.parking;
        const rentals = data.document.rental;

        // console.log('parkings', data.document.parking);
        console.log('rentals', data.document.rental);
        this.setState({
          user,
          ownParkings: parkings,
          reservations: rentals,
          loaded: true
        });
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

  render() {
    const user = this.state.user;
    const parkings = this.state.ownParkings;
    const rentals = this.state.reservations;

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
            {(rentals.length && (
              <>
                {rentals.map((rental, index) => (
                  <div key={rental._id}>
                    <img src={rental.parking.photo} alt={rental.parking.location} />
                    <h5>Location: {rental.parking.location}</h5>
                    <p>Price: {rental.parking.price}€/hr</p>
                    <button onClick={() => this.handleRentalFinish(index)}>End Rental</button>
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
                      <h5>Location: {parking.location}</h5>
                      <small>{parking.description}</small>
                      <p>Price: {parking.price}€/hr</p>
                      <Link to={`/parking/${parking._id}`}>Details </Link>
                      <Link to={`/parking/${parking._id}/edit`}> Edit Parking </Link>
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
