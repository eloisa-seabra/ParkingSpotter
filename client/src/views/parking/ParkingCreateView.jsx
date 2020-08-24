import React, { Component } from "react";
import Map from "../../components/Map/Index";
import { createParking } from "../../services/parking";

export class ParkingCreateView extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      description: "",
      price: 0,
      coordinates: [],
      photo: null,
      markers: [],
    };
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { location, description, coordinates, photo } = this.state;
    const price = Number(this.state.price);
    const body = { location, description, coordinates, price, photo };
    createParking(body);
  };
  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  handlePhotoChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      photo: file,
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
        <label htmlFor="create-map">Click on the map to place a marker of your parking spot</label>
        <div id="create-map">
          <Map markers={this.state.markers} handleClick={this.handleMapClick} />
        </div>
        <form method="POST" onSubmit={this.handleFormSubmit}>
          <label htmlFor="location">Place name or nearest address to parking spot:</label>
          <input
            id="location-input"
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleInputChange}
          />
          <label htmlFor="description-input">Describe any details that customers may need to know:</label>
          <input
            id="description-input"
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <label htmlFor="price-input">The hourly rate you want to charge for the parking spot:</label>
          <input
            id="price-input"
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleInputChange}
          />
          <label htmlFor="photo-input">Upload a photo so that customers can find your parking spot:</label>
          <input id="photo-input" type="file" name="photo" onChange={this.handlePhotoChange} />
          <button>Create your parking spot!</button>
        </form>
      </div>
    );
  }
}

export default ParkingCreateView;
