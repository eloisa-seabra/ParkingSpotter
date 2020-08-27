import React, { Component } from 'react';
import { getCoordinates } from '../services/geocoder';
import './../styles/_homeview.scss';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    getCoordinates(this.state.city)
      .then(response => {
        const coordinates = response.features[0].geometry.coordinates;
        this.props.handleLocationChange(coordinates);
      })
      .then(() => {
        this.props.history.push(`/parking/list`);
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
      <section id="homeview">
        <h2>No more waiting for parking spots</h2>
        <h1>Here the parking spots are waiting for you</h1>

        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="city" placeholder="Where do you want to park?" id="city-input" onChange={this.handleInputChange} />
          <button>Search</button>
        </form>
        {/* <button className="near-me-button btn btn-primary" onClick={this.triggerMyLocation}>
          Spots Near Me
        </button> */}
        <div className="img-gradient">
          <img src="https://res.cloudinary.com/isaseabra/image/upload/v1598269174/lisbon-min_gsjvuc.jpg" />
        </div>
        <section id="about" className="container">
          <h2>About ParkingSpotter</h2>
          <div className="row">
            <div className="col col-lg">
              <img className="about-icon" src="https://res.cloudinary.com/isaseabra/image/upload/v1598440828/hourglass_3805_ohs7jq.png" alt="timer" />
              <p>Tired of spending time searching for a parking spot in the big city or of expensive private parking lot fees?</p>
            </div>
            <div className="col col-lg">
              <img className="about-icon" src="https://res.cloudinary.com/isaseabra/image/upload/v1598478227/piggybank_jfyhz0.png" alt="piggy-bank" />
              <p>With ParkingSpotter you can save time and money and reserve your spot from someone's available private parking spot</p>
            </div>
            <div className="col col-lg">
              <img className="about-icon" src="https://res.cloudinary.com/isaseabra/image/upload/v1598440988/10507_ikvf7i.jpg" alt="idea" />
              <p>Choose your starting time and pay the time spent only when you leave the parking spot</p>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default HomeView;
