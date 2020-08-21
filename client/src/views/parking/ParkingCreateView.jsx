import React, { Component } from "react";
import { uploadParking } from "../../services/parking";
import { getCoordinates } from "../../services/geocoder";

export class ParkingCreateView extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      description: "",
      //lat: 41,
      //lon: 9,
      hourlyPrice: 0,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const address = this.state.address;
    const description = this.state.description;
    const hourlyPrice = Number(this.state.hourlyPrice);
    const body = { address, description, hourlyPrice };
    getCoordinates(address)
      .then((data) => {
        console.log(data);
        return uploadParking(body);
      })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
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
          <label htmlFor="address">Address</label>
          <input
            id="address-input"
            type="text"
            name="address"
            value={this.state.address}
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
            name="hourlyPrice"
            value={this.state.hourlyPrice}
            onChange={(event) => this.handleChange(event)}
          />
          <button>Create Parking</button>
        </form>
      </div>
    );
  }
}

export default ParkingCreateView;
