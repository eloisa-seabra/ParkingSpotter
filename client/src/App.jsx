import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { loadMe, signOut } from './services/authentication';
import 'bootstrap/dist/css/bootstrap.css';

import HomeView from './views/HomeView';
import AuthenticationSignUpView from './views/authentication/SignUpView';
import AuthenticationSignInView from './views/authentication/SignInView';
import ProfileView from './views/profile/ProfileView';
import EditProfileView from './views/profile/EditProfileView';
import ParkingListView from './views/parking/ParkingListView';
import ParkingCreateView from './views/parking/ParkingCreateView';
import ParkingIdView from './views/parking/ParkingIdView';
import ParkingEditView from './views/parking/ParkingEditView';
import RentalView from './views/rental/RentalView';
import PaymentView from './views/rental/PaymentView';
import ErrorView from './views/ErrorView';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { loadRental } from './services/rental';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
      user: null,
      ownParkings: [],
      rentals: [],
      activeRentals: [],
      coordinates: [-9.140821, 38.717393]
    };
  }

  componentDidMount() {
    loadMe()
      .then(data => {
        const user = data.user;
        this.handleUserUpdate(user);
        this.setState({
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });

    loadRental().then(data => {
      const rentals = data.rentals;
      const activeRentals = rentals.filter(function(rental) {
        return rental.status === 'rented';
      });

      this.setState({
        rentals,
        activeRentals
      });
    });
  }

  handleUserUpdate = user => {
    this.setState({
      user
    });
  };

  handleSignOut = () => {
    signOut()
      .then(() => {
        this.handleUserUpdate(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleLocationChange = coordinates => {
    this.setState({
      coordinates
    });
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user} onSignOut={this.handleSignOut} />
          {(this.state.loaded && (
            <Switch>
              <Route
                path="/"
                render={props => (
                  <HomeView
                    {...props}
                    handleLocationChange={this.handleLocationChange}
                    user={this.state.user}
                  />
                )}
                exact
              />
              <Route
                path="/profile"
                render={props => (
                  <ProfileView
                    {...props}
                    user={this.state.user}
                    onUserUpdate={this.handleUserUpdate}
                  />
                )}
                exact
              />
              <Route
                path="/profile/edit"
                render={props => (
                  <EditProfileView
                    {...props}
                    user={this.state.user}
                    onUserUpdate={this.handleUserUpdate}
                  />
                )}
              />
              <ProtectedRoute
                path="/authentication/sign-up"
                render={props => (
                  <AuthenticationSignUpView
                    {...props}
                    onUserUpdate={this.handleUserUpdate}
                  />
                )}
                authorized={!this.state.user}
                redirect="/"
              />
              <ProtectedRoute
                path="/authentication/sign-in"
                render={props => (
                  <AuthenticationSignInView
                    {...props}
                    onUserUpdate={this.handleUserUpdate}
                  />
                )}
                authorized={!this.state.user}
                redirect="/"
              />
              <Route
                path="/parking/list"
                render={props => (
                  <ParkingListView
                    {...props}
                    coordinates={this.state.coordinates}
                  />
                )}
              />
              <Route
                path="/parking/create"
                render={props => (
                  <ParkingCreateView
                    {...props}
                    coordinates={this.state.coordinates}
                    onUserUpdate={this.handleUserUpdate}
                  />
                )}
              />
              <Route
                path="/parking/:id/edit"
                render={props => (
                  <ParkingEditView
                    {...props}
                    coordinates={this.state.coordinates}
                    onUserUpdate={this.handleUserUpdate}
                  />
                )}
              />

              <Route
                path="/parking/:id"
                render={props => (
                  <ParkingIdView
                    {...props}
                    coordinates={this.state.coordinates}
                    user={this.state.user}
                  />
                )}
              />

              <Route
                path="/rental/:id"
                render={props => (
                  <PaymentView
                    {...props}
                    activeRentals={this.state.activeRentals}
                  />
                )}
              />
              <Route path="/rental" component={RentalView} />

              <Route path="/error" component={ErrorView} />
              <Redirect from="/" to="/error" />
            </Switch>
          )) || (
            <div>
              <h1>Loading...</h1>
            </div>
          )}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
