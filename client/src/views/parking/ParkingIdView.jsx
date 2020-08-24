import React, { Component } from 'react';
import { loadSingleParking, deleteSingleParking } from '../../services/parking';
import './ParkingIdView.css';
import { Link } from 'react-router-dom';

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
        console.log(data);
        const spot = data.spot;
        if (data.spot.user.parkings.includes(data.spot._id)) {
          this.setState({
            spot,
            ownSpot: true,
            loaded: true
          });
        } else {
          this.setState({
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
    // createNewRental();
  };

  render() {
    const spot = this.state.spot;
    return (
      <div>
        {(this.state.loaded && (
          <>
            <div className="details">
              <h2 className="details-info">{spot.location}</h2>
              <h3 className="details-info">{spot.price}</h3>
              <button onClick={this.triggerRental}>Reserve</button>
            </div>
            <div className="description">
              <p>{spot.description}</p>
              {this.state.ownSpot && (
                <>
                  <Link to={`/parking/${this.props.match.params.id}/edit`}>Edit Parking</Link>
                  <form onSubmit={this.handlePostDeletion}>
                    <button>Delete Post</button>
                  </form>
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
