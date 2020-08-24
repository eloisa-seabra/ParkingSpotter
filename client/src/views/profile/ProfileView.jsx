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
    this.loadProfile();
  }

  loadProfile = () => {
    loadProfile()
      .then(data => {
        const user = data.user;
        this.setState({
          user,
          ownParkings: user.parkings,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleParkingDeletion = index => {
    const id = this.state.user.parkings[index]._id;
    // const parkingList = [...this.state.user.parkings];

    deleteSingleParking(id)
      .then(() => {
        this.loadProfile();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const user = this.state.user;
    console.log(user);
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
              {(user.parkings.length && (
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

// import React from 'react';

// function ProfileView(props) {
//   return (
//     <div>
//       {console.log(props.user)}
//       <h1>Profile View</h1>
//       <h4>name:</h4>
//     </div>
//   );
// }

// export default ProfileView;
