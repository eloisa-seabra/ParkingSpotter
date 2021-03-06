import React, { Component } from 'react';
import { loadProfile, editProfile } from '../../services/profile';
import '../../styles/_signupView.scss';

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
        console.log(data);
        const user = this.props.user;
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

  handleProfileEditing = event => {
    event.preventDefault();

    const { name, email } = this.state;
    const id = this.props.user._id;
    const body = { id, name, email };

    editProfile(body)
      .then(data => {
        this.props.onUserUpdate(body);
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
        {this.state.loaded && (
          <>
            <form
              onSubmit={this.handleProfileEditing}
              onChange={this.handleInputChange}
            >
              <div className="form-group">
                <label htmlFor="input-name">Full Name</label>
                <input
                  className="form-control"
                  id="input-name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group"></div>
              <label htmlFor="input-email">Email</label>
              <input
                className="form-control"
                id="input-email"
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />

              <button className="blue-btn">Update Profile</button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default EditProfileView;
