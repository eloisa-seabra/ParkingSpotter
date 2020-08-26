import React, { Component } from "react";
import Map from "../../components/Map/Index";
import List from "../../components/List/Index";
import { loadParking } from "../../services/parking";

export class ParkingListView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      mapView: true,
      parking: [],
    };
  }
  componentDidMount() {
    const coordinates = this.props.coordinates;
    loadParking(coordinates).then((data) => {
      this.setState({
        loaded: true,
        parking: data.spots,
      });
    });
  }
  toggleView = () => {
    this.setState({
      mapView: !this.state.mapView,
    });
  };
  render() {
    return (
      <div>
        {(this.state.loaded && this.state.mapView && (
          <>
            <button onClick={this.toggleView}>View List</button>
            <Map markers={this.state.parking} coordinates={this.props.coordinates} />
          </>
        )) || (
          <>
            <button onClick={this.toggleView}>View Map</button>
            <List items={this.state.parking} />
          </>
        )}
        ;
      </div>
    );
  }
}

export default ParkingListView;
