import React, { Component } from 'react';
import { editSingleParking, loadSingleParking } from '../../services/parking';
/* import { getCoordinates } from '../../services/geocoder'; */
/* import PostForm from './../components/PostForm'; */

export class ParkingEditView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      spot: null,
      location: '',
      description: '',
      price: 0
      //lat: 41,
      //lon: 9,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    loadSingleParking(id)
      .then(data => {
        const spot = data.spot;
        this.setState({
          location: spot.location,
          description: spot.description,
          price: spot.price,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handlePostEdition = event => {
    const id = this.props.match.params.id;
    const { location, description } = this.state;
    const price = Number(this.state.price);
    const body = { location, description, price };
    //const coordinates = await getCoordinates(location);
    editSingleParking(id, body)
      .then(data => {
        console.log(body);
        this.props.history.push(`/parking/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handlePostEdition}>
          <label htmlFor="location">Location</label>
          <input
            id="location-input"
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />
          <label htmlFor="description-input">Description</label>
          <input
            id="description-input"
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <label htmlFor="price-input">Price</label>
          <input
            id="price-input"
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <button>Edit Parking</button>
        </form>
      </div>
    );
  }
}

export default ParkingEditView;
