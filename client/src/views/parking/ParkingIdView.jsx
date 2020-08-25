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
    console.log(this.props.user);
    loadSingleParking(id)
      .then(data => {
        const spot = data.spot;
        if (spot.user._id === this.props.user._id) {
          this.setState({
            mapView: true,
            spot,
            ownSpot: true,
            loaded: true
          });
        } else {
          this.setState({
            mapView: true,
            spot,
            loaded: true
          });
        }
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
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const spot = this.state.spot;
    return (
      <div>
        {(this.state.loaded && this.state.mapView && (
          <>
            <Map markers={[{ lng: spot.lng, lat: spot.lat }]} />

            <img
              style={{ width: '300px' }}
              src={spot.photo}
              alt={spot.location}
            />

            <div className="details">
              <h2 className="details-info">{spot.location}</h2>
              <h3 className="details-info">{spot.price}</h3>
              <h3 className="details-info">{spot.user.name}</h3>
            </div>
            <div className="description">
              <p>{spot.description}</p>
              {(this.state.ownSpot && (
                <>
                  <Link to={`/parking/${this.props.match.params.id}/edit`}>
                    Edit Parking
                  </Link>
                  <form onSubmit={this.handlePostDeletion}>
                    <button>Delete Post</button>
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
