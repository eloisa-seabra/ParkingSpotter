import React, { Component } from "react";
import { uploadParking } from "../../services/parking";

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
  handlePostCreation = () => {
    const address = this.state.address;
    const description = this.state.description;
    const lat = this.state.lat;
    const lon = this.state.lon;

    const body = { address, description, lat, lon };
    uploadParking(body)
      .then((data) => {
        console.log(data);
      })
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
        <form method="POST" onSubmit>
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
