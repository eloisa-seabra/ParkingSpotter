import React, { Component } from 'react';
import { searchParking } from '../services/parking';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      day: '2020-08-27',
      time: '14:00'
    };
  }

  componentDidMount() {
    const currentDate = new Date();

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    const currentDay = year + '-' + month + '-' + day;

    let h = currentDate.getHours();
    let m = currentDate.getMinutes();
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    const currentTime = h + ':' + m;

    this.setState({
      day: currentDay,
      time: currentTime
    });
  }

  handleParkSearch = event => {
    event.preventDefault();

    const body = this.state;

    console.log(body);
    // searchParking(body)
    //   .then(data => {
    //     console.log(data);
    //     // const post = data.post;
    //     // const id = post._id;
    //     // Redirect user to single post view
    //     this.props.history.push(`/parking/list`);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  handleInputChange = event => {
    const value = event.target.value;
    const property = event.target.name;

    this.setState({
      [property]: value
    });
  };

  triggerMyLocation() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(latitude, longitude);
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <div>
        <h2>No more waiting for parking spots</h2>
        <h1>Here are the parking spots waiting for you</h1>

        <form onSubmit={this.handleParkSearch}>
          <label htmlFor="city-input">City</label>
          <input type="text" name="city" placeholder="Park here..." id="city-input" onChange={this.handleInputChange} />
          <label htmlFor="date-input">Date:</label>
          <input type="date" name="day" id="date-input" value={this.state.day} onChange={this.handleInputChange} />
          <label htmlFor="time-input">Starting Time:</label>
          <input type="time" name="time" id="time-input" value={this.state.time} onChange={this.handleInputChange} />
          <button>Search</button>
        </form>
        <button onClick={this.triggerMyLocation}>Spots Near Me</button>
      </div>
    );
  }
}

export default HomeView;
