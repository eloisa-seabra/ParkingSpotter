import React, { Component } from 'react';
import Map from '../../components/Map/Index';
import List from '../../components/List/Index';
import { loadParking } from '../../services/parking';

export class ParkingListView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      mapView: true,
      parking: []
    };
  }
  componentDidMount() {
    const coordinates = this.props.coordinates;
    loadParking(coordinates).then(data => {
      this.setState({
        loaded: true,
        parking: data.spots
      });
    });
  }
  toggleView = () => {
    this.setState({
      mapView: !this.state.mapView
    });
  };
  render() {
    return (
      <section id="parking-list" className="container">
        {this.state.loaded && (
          <>
            <div className="row">
              <div className="col-lg-6">
                <Map markers={this.state.parking} coordinates={this.props.coordinates} />
              </div>
              <div className="col-lg-6">
                <List items={this.state.parking} />
              </div>
            </div>
          </>
        )}
      </section>
    );
  }
}

export default ParkingListView;
