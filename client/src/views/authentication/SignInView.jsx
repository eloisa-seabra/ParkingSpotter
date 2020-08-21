import React, { Component } from 'react';
import { signIn } from './../../services/authentication';

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
      <div>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required />

          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required minLength="8" />

          {this.state.error && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{this.state.error.message}</p>
            </div>
          )}

          <button>Sign In</button>
        </form>
      </div>
    );
  }
}

export default AuthenticationSignInView;
