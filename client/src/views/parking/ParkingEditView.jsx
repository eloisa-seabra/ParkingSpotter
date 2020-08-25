import React, { Component } from "react";
import { editSingleParking, loadSingleParking } from "../../services/parking";
import Map from "../../components/Map/Index";
/* import { getCoordinates } from '../../services/geocoder'; */
/* import PostForm from './../components/PostForm'; */

export class ParkingEditView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      spot: null,
      location: "",
      description: "",
      price: 0,
      lat: 0,
      lng: 0,
      photo: null,
      markers: [],
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    loadSingleParking(id)
      .then((data) => {
        const spot = data.spot;
        this.setState({
          location: spot.location,
          description: spot.description,
          price: spot.price,
          lat: spot.lat,
          lng: spot.lng,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePostEdition = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    const { location, description, lat, lng, photo } = this.state;
    const price = Number(this.state.price);
    const body = { location, description, lat, lng, price, photo };
    editSingleParking(id, body)
      .then((document) => {
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
    const lng = this.state.lng;
    const lat = this.state.lat;
    return (
      <div>
        <label htmlFor="create-map">Click on the map to place a marker of your parking spot</label>
        <div id="create-map">
          <Map markers={[{ lng, lat }]} coordinates={this.props.coordinates} handleClick={this.handleMapClick} />
        </div>
        <form onSubmit={this.handlePostEdition}>
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
          <button>Edit Parking</button>
        </form>
      </div>
    );
  }
}

export default ParkingEditView;
