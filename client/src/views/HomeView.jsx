import React, { Component } from 'react';
import { searchParking } from '../services/parking';
import './HomeView.css';

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
        <div>
<<<<<<< HEAD
          <img style={{ width: '1300px' }} src="https://res.cloudinary.com/isaseabra/image/upload/v1598193410/252430-P4G84R-789__hc4lsf.jpg" />
        </div>
        <div className="about">
          <div className="about-list">
            <p> Tired of spending time searching for a parking spot in the big city or of expensive private parking lot fees?</p>
            <p> With ParkingSpotter you can save time and money and reserve your spot from someone's available private parking spot </p>
            <p> Choose your starting time and pay the time spent only when you leave the parking spot </p>
=======
          <img
            style={{ width: '1400px' }}
            src="https://res.cloudinary.com/isaseabra/image/upload/v1598216624/lisbon_j3xl0z.jpg"
          />
        </div>
        <div>
          <div className="about">
            <p className="about-list">
              {' '}
              Tired of spending time searching for a parking spot in the big
              city or of expensive private parking lot fees?
            </p>
            <p className="about-list">
              {' '}
              With ParkingSpotter you can save time and money and reserve your
              spot from someone's available private parking spot{' '}
            </p>
            <p className="about-list">
              {' '}
              Choose your starting time and pay the time spent only when you
              leave the parking spot{' '}
            </p>
>>>>>>> 65029b5004ec7d63e48879e537fd0a0b7f8985a9
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
