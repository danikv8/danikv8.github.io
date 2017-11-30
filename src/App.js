import React, { Component } from 'react';
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
     types: ['address'],
     strictBounds: true
   }
   this.autocomplete = new window.google.maps.places.Autocomplete(input, options);
}

componentWillReceiveProps(nextProps) {
  if(this.autocomplete)
    this.autocomplete.setBounds(this.getOptions(nextProps))
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

getOptions(nextProps) {
  if(nextProps.coords)
     return new window.google.maps.Circle({
        center: {
          lat: nextProps.coords.latitude,
          lng: nextProps.coords.longitude
        },
        radius: nextProps.coords.accuracy + 1000}).getBounds()
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
