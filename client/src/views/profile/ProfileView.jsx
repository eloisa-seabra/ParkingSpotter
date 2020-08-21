import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from '../../services/authentication';

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null
    };
  }

  componentDidMount() {
    loadProfile()
      .then(data => {
        const user = data.user;
        this.setState({
          user,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

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
            <hr />
            <h4>My spots:</h4>
            <p>array.map of my spots</p>
            <Link to="/">View list of spots</Link>
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
