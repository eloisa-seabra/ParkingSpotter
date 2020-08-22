import React, { Component } from 'react';
import Map from '../../components/Map/Index';
import List from '../../components/List/Index';
import markers from './markers.json';

export class ParkingListView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      parking: []
    };
  }
  componentDidMount() {
    // loadParking().then((data) => {
    //   const parking = data.parking;
    //   this.setState({
    //     loaded: true,
    //     parking,
    //   });
    // });
    this.setState({
      loaded: true,
      mapView: true,
      parking: markers
    });
  }
  toggleView = () => {
    this.setState({
      mapView: !this.state.mapView
    });
  };
  render() {
    return (
      <div>
        {(this.state.loaded && this.state.mapView && (
          <>
            <Map markers={this.state.parking} />
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
