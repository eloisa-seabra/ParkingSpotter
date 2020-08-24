import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from '../../services/profile';
import { deleteSingleParking } from '../../services/parking';
import ParkingSpot from './../../components/ParkingSpot/Index';

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      ownParkings: []
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
        const parkings = data.parking;

        this.setState({
          user,
          ownParkings: parkings,
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
            <h4>My reservation:</h4>
            <p>array.map of current rental</p>
            <hr />
            <h4>My last rentals:</h4>
            <p>array.map of past rentals</p>
            <div className="own-parkings">
              <hr />
              <h4>My spots:</h4>
              {(this.state.ownParkings.length && (
                <>
                  {user.parkings.map((parking, index) => (
                    <ParkingSpot
                      key={parking._id}
                      parking={parking}
                      onClick={this.handleParkingDeletion(index)}
                    />
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
