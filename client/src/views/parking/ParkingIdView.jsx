import React, { Component } from 'react';
import { loadSingleParking, deleteSingleParking } from '../../services/parking';
import { createNewRental } from '../../services/rental';
import './ParkingIdView.css';
import { Link } from 'react-router-dom';
import Map from '../../components/Map/Index';

export class ParkingIdView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      spot: null,
      ownSpot: false
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    loadSingleParking(id)
      .then(data => {
        const spot = data.spot;
        const isOwner = spot.user._id === this.props.user._id ? true : false;
        this.setState({
          spot,
          ownSpot: isOwner,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  handlePostDeletion = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    deleteSingleParking(id)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };
  triggerRental = () => {
    const parkingId = this.props.match.params.id;
    const ownerId = this.state.spot.user._id;
    const renterId = this.props.user._id;
    const parkingPrice = this.state.spot.price;
    const body = { parkingId, ownerId, renterId, parkingPrice };
    console.log(body);
    createNewRental(body)
      .then(document => {
        console.dir(document);
        this.props.history.push('/profile');
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        {(this.state.loaded && (
          <>
            <Map
              coordinates={[this.state.spot.lng, this.state.spot.lat]}
              markers={[{ lng: this.state.spot.lng, lat: this.state.spot.lat }]}
            />

            <img
              style={{ width: '300px' }}
              src={this.state.spot.photo}
              alt={this.state.spot.location}
            />

            <div className="details">
              <h2 className="details-info">{this.state.spot.location}</h2>
              <h3 className="details-info">{this.state.spot.price}</h3>
              <h3 className="details-info">{this.state.spot.user.name}</h3>
            </div>
            <div className="description">
              <p>{this.state.spot.description}</p>
              {(this.state.ownSpot && (
                <>
                  <Link to={`/parking/${this.props.match.params.id}/edit`}>
                    Edit Parking
                  </Link>
                  <form onSubmit={this.handlePostDeletion}>
                    <button>Delete Parking Spot</button>
                  </form>
                </>
              )) || (
                <>
                  <button onClick={this.triggerRental}>Reserve</button>
                </>
              )}
            </div>
          </>
        )) || <p>Loading...</p>}
      </div>
    );
  }
}

export default ParkingIdView;
