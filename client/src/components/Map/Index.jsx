import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Index';
import './style.scss';

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 38.717393,
      lng: -9.140821
    },
    zoom: 14
  };
  render() {
    const center = {
      lng: this.props.coordinates[0],
      lat: this.props.coordinates[1]
    };
    return (
      // Important! Always set the container height explicitly
      <div className="map-list">
        <GoogleMapReact bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }} defaultCenter={center} defaultZoom={this.props.zoom} onClick={this.props.handleClick}>
          {this.props.markers &&
            this.props.markers.map(marker => (
              <Marker
                key={marker._id}
                icon={{
                  url: 'https://res.cloudinary.com/isaseabra/image/upload/v1598450248/marker_kbr6zn.png'
                }}
                id={marker._id}
                lat={marker.lat}
                lng={marker.lng}
                price={marker.price}
              />
            ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
