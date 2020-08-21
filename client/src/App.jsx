import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { loadMe, signOut } from "./services/authentication";

import "./App.css";

<<<<<<< HEAD
import AuthenticationSignUpView from './views/authentication/SignUpView';
import AuthenticationSignInView from './views/authentication/SignInView';
import ProfileView from './views/profile/ProfileView';
import EditProfileView from './views/profile/EditProfileView';
import ParkingListView from './views/ParkingListView';
import ErrorView from './views/ErrorView';
=======
import AuthenticationSignUpView from "./views/authentication/SignUpView";
import AuthenticationSignInView from "./views/authentication/SignInView";
import ParkingListView from "./views/parking/ParkingListView";
import ParkingCreateView from "./views/parking/ParkingCreateView";
import ErrorView from "./views/ErrorView";
>>>>>>> fce9e3444ce52a329023adbc6ccd3a3236e2f19d

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
      user: null,
    };
  }

  componentDidMount() {
    loadMe()
      .then((data) => {
        const user = data.user;
        this.handleUserUpdate(user);
        this.setState({
          loaded: true,
        });
      })
<<<<<<< HEAD
      .catch(error => {
=======
      .then((error) => {
>>>>>>> fce9e3444ce52a329023adbc6ccd3a3236e2f19d
        console.log(error);
      });
  }

  handleUserUpdate = (user) => {
    this.setState({
      user,
    });
  };

  handleSignOut = () => {
    signOut()
      .then(() => {
        this.handleUserUpdate(null);
      })
      .catch((error) => {
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
              <Route path="/" exact />
              <Route path="/profile" component={ProfileView} exact />
              <Route path="/profile/edit" component={EditProfileView} />
              <ProtectedRoute
                path="/authentication/sign-up"
                render={(props) => <AuthenticationSignUpView {...props} onUserUpdate={this.handleUserUpdate} />}
                authorized={!this.state.user}
                redirect="/"
              />
              <ProtectedRoute
                path="/authentication/sign-in"
                render={(props) => <AuthenticationSignInView {...props} onUserUpdate={this.handleUserUpdate} />}
                authorized={!this.state.user}
                redirect="/"
              />
              <Route path="/parking/list" component={ParkingListView} />
              <Route path="/parking/create" component={ParkingCreateView} />
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
