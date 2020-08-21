import React, { Component } from "react";
import Map from "../components/Map/Index";
import markers from "./markers.json";

export class ParkingListView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      markers: null,
    };
  }
  componentDidMount() {
    this.setState({
      loaded: true,
      markers,
    });
  }
  render() {
    return <div>{this.state.loaded && <Map markers={this.state.markers} />}</div>;
  }
}

export default ParkingListView;
