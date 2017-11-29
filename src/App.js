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
   var input = document.getElementById('searchTextField');
   var options = {
     bounds: this.getOptions(),
     types: ['establishment']
   };
   this.autocomplete = new window.google.maps.places.Autocomplete(input, options);
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

getOptions() {
  if(this.props.coords) {
     return new window.google.maps.Circle({
        center: {
          lat: this.props.coords.latitude,
          lng: this.props.coords.longtitude
        },
        radius: this.props.coords.accuracy + 100})
    }
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
        <input id="searchTextField" type="text" size="50" placeholder="Anything you want!" />
      </div>
    </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
  })(App);
