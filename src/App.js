import React, { Component } from 'react';
import logo from './logo.svg';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {geolocated} from 'react-geolocated';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      address: [],
      free_address: ''
    };
  }

componentDidMount() {
   this.geocoder = new window.google.maps.Geocoder()
}

enterCoordinates() {
  console.log(this.props.coords)
  this.geocoder.geocode({location: {
    lat: parseFloat(this.props.coords.latitude),
    lng: parseFloat(this.props.coords.longitude)
  }}, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        console.log(results)
        this.setState({address: results.filter(result => result.types.includes('street_address'))})
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
  }})
}

render() {
  return (
    <div>
      <div>
        <p>
          Enter Lat and Long
        </p>
          {!this.props.isGeolocationAvailable
          ? <div>Your browser does not support Geolocation</div>
          : !this.props.isGeolocationEnabled
            ? <div>Geolocation is not enabled</div>
            :  this.props.coords ?
        <button onClick={(event) => this.enterCoordinates()}>
          Calculate Address , Accuracy {this.props.coords.accuracy}
        </button>
        : <div> Getting Location Data</div>
        }
      <ul>
        {this.state.address.map(address => {
        return (<li key={address.formatted_address}> 
          {address.formatted_address} 
          </li>)
        })}
      </ul>
      </div>
      <div>
        <p>
          Enter Address
        </p>
        <PlacesAutocomplete 
          inputProps={{
            onChange: (address) => this.setState({free_address: address}),
            value: this.state.free_address,
            types: ['address']  
        }}/>
        <div>
        </div>
      </div>
    </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
  })(App);
