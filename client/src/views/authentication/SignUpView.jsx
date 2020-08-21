import React, { Component } from 'react';
import { signUp } from './../../services/authentication';

class AuthenticationSignUpView extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
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
    const { name, email, password } = this.state;
    const body = { name, email, password };
    signUp(body)
      .then(data => {
        const { user } = data;
        this.props.onUserUpdate(user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name">Full Name</label>
          <input id="input-name" type="text" name="name" placeholder="Full Name" value={this.state.name} onChange={this.handleInputChange} />

          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />

          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />

          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default AuthenticationSignUpView;
