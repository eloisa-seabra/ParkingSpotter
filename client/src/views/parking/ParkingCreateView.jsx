import React, { Component } from "react";
import Map from "../../components/Map/Index";
import { createParking } from "../../services/parking";
import { NotExtended } from "http-errors";

export class ParkingCreateView extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      description: "",
      price: 0,
      lat: 0,
      lng: 0,
      photo: null,
      markers: [],
    };
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { location, description, lat, lng, photo } = this.state;
    const price = Number(this.state.price);
    const body = { location, description, lat, lng, price, photo };
    createParking(body)
      .then((document) => {
        console.dir(document);
        const id = document.document._id;
        console.log(id);
        this.props.history.push(`/parking/${id}`);
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
  handlePhotoChange = (event) => {
    const photo = event.target.files[0];
    this.setState({
      photo,
    });
  };
  handleMapClick = (event) => {
    const { lng, lat } = event;
    const marker = {
      lng,
      lat,
    };
    this.setState({
      lng,
      lat,
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
