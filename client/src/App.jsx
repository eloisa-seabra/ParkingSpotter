import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { loadMe, signOut } from "./services/authentication";

import "./App.css";

import AuthenticationSignUpView from "./views/authentication/SignUpView";
import AuthenticationSignInView from "./views/authentication/SignInView";
import ParkingListView from "./views/ParkingListView";
import ErrorView from "./views/ErrorView";

<<<<<<< HEAD
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
=======
import ProtectedRoute from "./components/ProtectedRoute";
>>>>>>> 33dc9e3ab4c9be435634936ff79eb1e6e8b40b2b

class App extends Component {
  constructor() {
    super();
    this.state = {
<<<<<<< HEAD
      loaded: true,
      user: null
=======
      loaded: false,
      user: null,
>>>>>>> 33dc9e3ab4c9be435634936ff79eb1e6e8b40b2b
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
      .then((error) => {
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
              <Route path="/list" component={ParkingListView} />
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
