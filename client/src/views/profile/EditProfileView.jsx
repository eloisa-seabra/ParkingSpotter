import React, { Component } from 'react';
import { loadProfile, editProfile } from '../../services/authentication';

class EditProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      name: '',
      email: ''
    };
  }

  componentDidMount() {
    loadProfile()
      .then(data => {
        const user = data.user;
        this.setState({
          loaded: true,
          name: user.name,
          email: user.email
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleProfileEditing = () => {
    const { name, email } = this.state;
    const body = { name, email };

    editProfile(body)
      .then(data => {
        this.props.history.push('/profile');
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputChange = event => {
    const value = event.target.value;
    const property = event.target.name;

    this.setState({
      [property]: value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleProfileEditing} onChange={this.handleInputChange}>
          <label htmlFor="input-name">Full Name</label>
          <input id="input-name" type="text" name="name" placeholder="Full Name" value={this.state.name} onChange={this.handleInputChange} />

          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />

          <button>Update Profile</button>
        </form>
      </div>
    );
  }
}

export default EditProfileView;
