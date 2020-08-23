import React, { Component } from "react";
import { createParking } from "../../services/parking";
import { getCoordinates } from "../../services/geocoder";

export class ParkingCreateView extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      description: "",
      price: 0,
      //lat: 41,
      //lon: 9,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { location, description } = this.state;
    const price = Number(this.state.price);
    const body = { location, description, price };
    //const coordinates = await getCoordinates(location);
    createParking(body);
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <form method="POST" onSubmit={(event) => this.handleSubmit(event)}>
          <label htmlFor="location">Location</label>
          <input
            id="location-input"
            type="text"
            name="location"
            value={this.state.location}
            onChange={(event) => this.handleChange(event)}
          />
          <label htmlFor="description-input">Description</label>
          <input
            id="description-input"
            type="text"
            name="description"
            value={this.state.description}
            onChange={(event) => this.handleChange(event)}
          />
          <label htmlFor="price-input">Price</label>
          <input
            id="price-input"
            type="number"
            name="price"
            value={this.state.price}
            onChange={(event) => this.handleChange(event)}
          />
          <button>Create Parking</button>
        </form>
      </div>
    );
  }
}

export default ParkingCreateView;
