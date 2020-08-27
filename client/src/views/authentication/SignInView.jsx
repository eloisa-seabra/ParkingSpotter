import React, { Component } from 'react';
import { signIn } from './../../services/authentication';
import '../../styles/_signinView.scss';

class AuthenticationSignInView extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const body = { email, password };
    signIn(body)
      .then(data => {
        const { user } = data;
        this.props.onUserUpdate(user);
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
      });
  };

  render() {
    return (
      <div id="sign-in">
        <form onSubmit={this.handleFormSubmission}>
          <div className="form-group">
            <label htmlFor="input-email">Email</label>
            <input className="form-control" id="input-email" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="input-password">Password</label>
            <input
              className="form-control"
              id="input-password"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
              minLength="6"
            />
          </div>
          {this.state.error && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{this.state.error.message}</p>
            </div>
          )}

          <button className="blue-btn">Sign In</button>
        </form>
      </div>
    );
  }
}

export default AuthenticationSignInView;
