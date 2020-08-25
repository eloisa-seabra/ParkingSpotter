import React, { Component } from "react";
import Map from "../../components/Map/Index";
import List from "../../components/List/Index";
import { loadParking } from "../../services/parking";

export class ParkingListView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      parking: [],
    };
  }
  componentDidMount() {
    const coordinates = this.props.location;
    const body = { coordinates };
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
            <Map markers={this.state.parking} location={this.props.location} />
            <button onClick={this.toggleView}>View List</button>
          </>
        )) || (
          <>
            <List items={this.state.parking} />
            <button onClick={this.toggleView}>View Map</button>
          </>
        )}
        ;
      </div>
    );
  }
}

export default ParkingListView;
