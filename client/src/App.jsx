import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { loadMe, signOut } from './services/authentication';

import './App.css';

import HomeView from './views/HomeView';
import AuthenticationSignUpView from './views/authentication/SignUpView';
import AuthenticationSignInView from './views/authentication/SignInView';
import ProfileView from './views/profile/ProfileView';
import EditProfileView from './views/profile/EditProfileView';
import ParkingListView from './views/parking/ParkingListView';
import ParkingCreateView from './views/parking/ParkingCreateView';
import ParkingIdView from './views/parking/ParkingIdView';
import ParkingEditView from './views/parking/ParkingEditView';
import ErrorView from './views/ErrorView';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
      user: null
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

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user} onSignOut={this.handleSignOut} />
          {(this.state.loaded && (
            <Switch>
              <Route path="/" component={HomeView} exact />
              <Route path="/profile" component={ProfileView} exact />
              <Route path="/profile/edit" component={EditProfileView} />
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
              <Route path="/parking/list" component={ParkingListView} />
              <Route path="/parking/create" component={ParkingCreateView} />
              <Route path="/parking/:id/edit" component={ParkingEditView} />
              <Route path="/parking/:id" component={ParkingIdView} />

              <Route path="/error" component={ErrorView} />
              <Redirect from="/" to="/error" />
              {/* <Route path="/authentication/sign-in" component={AuthenticationSignInView} /> */}
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
