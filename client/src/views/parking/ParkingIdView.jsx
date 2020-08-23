import React, { Component } from 'react';
import { loadSingleParking, deleteSingleParking } from '../../services/parking';
import './ParkingIdView.css';
/* import Price from './../components/Price'; */
import { Link } from 'react-router-dom';

export class ParkingIdView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      spot: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    loadSingleParking(id)
      .then(data => {
        const spot = data.spot;
        this.setState({
          spot,
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

  render() {
    const spot = this.state.spot;
    return (
      <div>
        {(this.state.loaded && (
          <>
            <div className="details">
              <h2 className="details-info">{spot.location}</h2>
              <h3 className="details-info">{spot.price}</h3>
              <h3 className="details-info">Reserve</h3>
            </div>
            <div className="description">
              <p>{spot.description}</p>
              <Link to={`/parking/${this.props.match.params.id}/edit`}>
                Edit Parking
              </Link>
            </div>
          </>
        )) || <p>Loading...</p>}
        <form onSubmit={this.handlePostDeletion}>
          <button>Delete Post</button>
        </form>
      </div>
    );
  }
}

export default ParkingIdView;
