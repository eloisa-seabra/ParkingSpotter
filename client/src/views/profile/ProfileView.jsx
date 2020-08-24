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
      ownParkings: []
    };
  }

  componentDidMount() {
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
  }

  handleParkingDeletion = index => {
    const id = this.state.user.parkings[index]._id;
    const parkingList = [...this.state.user.parkings];

    deleteSingleParking(id)
      .then(() => {
        parkingList.splice(index, 1);
        console.log(parkingList);
        this.setState({
          ownParkings: parkingList
        });
        //this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const user = this.state.user;
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
              {user.parkings.map((parking, index) => (
                <div key={parking._id}>
                  <h5>Location: {parking.location}</h5>
                  <small>{parking.description}</small>
                  <p>Price: {parking.price}$/hr</p>
                  <Link to={`/parking/${parking._id}`}>Details </Link>
                  <Link to={`/parking/${parking._id}/edit`}> Edit Parking </Link>
                  <button onClick={() => this.handleParkingDeletion(index)}>Delete</button>
                  {/* <form onSubmit={this.handleParkingDeletion}>
                    <button>Delete</button>
                  </form> */}
                </div>
              ))}
              <Link to="/">View list of spots</Link>
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
