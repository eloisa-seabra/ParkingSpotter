import React, { Component } from 'react';
import { loadSingleParking, deleteSingleParking } from '../../services/parking';
import { createNewRental } from '../../services/rental';
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
        console.log(spot.user._id);
        console.log(this.props.user._id);
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
            <Map coordinates={[this.state.spot.lng, this.state.spot.lat]} markers={[{ lng: this.state.spot.lng, lat: this.state.spot.lat }]} />
            <section id="parking-single" className="container">
              <div className="row my-5">
                <div className="col">
                  <img src={this.state.spot.photo} alt={this.state.spot.location} />
                </div>
                <div className="col details">
                  <h2 className="text-left parking-title">{this.state.spot.location.toUpperCase()}</h2>
                  <p className="parking-description">{this.state.spot.description}</p>
                  <p className="parking-owner">
                    <small>Owner: {this.state.spot.user.name}</small>
                  </p>
                  <h3 className="parking-price">{this.state.spot.price} €/hour</h3>
                  {(this.state.ownSpot && (
                    <>
                      <div className="parking-actions">
                        <Link classname="delete-button btn btn-outline-primary" to={`/`} onSubmit={this.handlePostDeletion}>
                          Delete
                        </Link>
                        <Link classname="edit-button btn btn-primary" to={`/parking/${this.props.match.params.id}/edit`}>
                          Edit Parking
                        </Link>
                      </div>
                    </>
                  )) || (
                    <>
                      <button onClick={this.triggerRental}>Reserve</button>
                    </>
                  )}
                </div>
              </div>
            </section>
            id="parking-single"
          </>
        )) || <p>Loading...</p>}
      </div>
    );
  }
}

export default ParkingIdView;
