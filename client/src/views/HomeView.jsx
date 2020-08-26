import React, { Component } from "react";
import { getCoordinates } from "../services/geocoder";

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    getCoordinates(this.state.city)
      .then((response) => {
        const coordinates = response.features[0].geometry.coordinates;
        this.props.handleLocationChange(coordinates);
      })
      .then(() => {
        this.props.history.push(`/parking/list`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const property = event.target.name;

    this.setState({
      [property]: value,
    });
  };

  triggerMyLocation() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <div>
        <h2>No more waiting for parking spots</h2>
        <h1>Here are the parking spots waiting for you</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="city-input">City</label>
          <input type="text" name="city" placeholder="Park here..." id="city-input" onChange={this.handleInputChange} />
          <button>Search</button>
        </form>
        <button onClick={this.triggerMyLocation}>Spots Near Me</button>
        <div>
          <img
            style={{ width: "1300px" }}
            src="https://res.cloudinary.com/isaseabra/image/upload/v1598269174/lisbon-min_gsjvuc.jpg"
          />
        </div>
        <div className="about">
          <div className="about-list">
            <p>
              Tired of spending time searching for a parking spot in the big city or of expensive private parking lot
              fees?
            </p>
            <img
              style={{ width: "200px" }}
              src="https://res.cloudinary.com/isaseabra/image/upload/v1598440909/5872_rehcil.jpg"
              alt="piggy-bank"
            />
            <p>
              With ParkingSpotter you can save time and money and reserve your spot from someone's available private
              parking spot
            </p>
            <p>Choose your starting time and pay the time spent only when you leave the parking spot</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
