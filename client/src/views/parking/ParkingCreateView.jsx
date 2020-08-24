import React, { Component } from "react";
import Map from "../../components/Map/Index";
import { createParking } from "../../services/parking";
import { getCoordinates } from "../../services/geocoder";

export class ParkingCreateView extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      description: "",
      price: 0,
      coordinates: [],
      markers: [],
    };
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { location, description, coordinates } = this.state;
    const price = Number(this.state.price);
    const body = { location, description, coordinates, price };
    createParking(body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleMapClick = (event) => {
    const { lng, lat } = event;
    const newCoordinates = [lng, lat];
    const marker = {
      lng: newCoordinates[0],
      lat: newCoordinates[1],
    };
    this.setState({
      coordinates: newCoordinates,
      markers: [marker],
    });
  };
  render() {
    return (
      <div>
        <Map markers={this.state.markers} handleClick={this.handleMapClick} />
        <form method="POST" onSubmit={this.handleFormSubmit}>
          <label htmlFor="location">Location</label>
          <input
            id="location-input"
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleInputChange}
          />
          <label htmlFor="description-input">Description</label>
          <input
            id="description-input"
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <label htmlFor="price-input">Price</label>
          <input
            id="price-input"
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleInputChange}
          />
          <button>Create Parking</button>
        </form>
      </div>
    );
  }
}

export default ParkingCreateView;
