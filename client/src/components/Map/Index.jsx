import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../Marker/Index";
import "./style.css";

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 41.2,
      lng: -8.6,
    },
    zoom: 3,
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "50vh", width: "50%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAw2az2R5q9_mJ7jChQnNcIMikkfp8Oz8Q" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.markers.map((marker) => (
            <Marker lat={marker.lat} lng={marker.lng} text={marker.text} />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
