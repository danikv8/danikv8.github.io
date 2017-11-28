import React, { Component } from 'react';
import logo from './logo.svg';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      long: 0,
      address: '',
      free_address: ''
    };
  }

componentDidMount() {
   this.geocoder = new window.google.maps.Geocoder()
}

enterCoordinates() {
  this.geocoder.geocode({location: {
    lat: parseFloat(this.state.lat),
    lng: parseFloat(this.state.long)
  }}, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        this.setState({address: results[0].formatted_address})
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
        <input type="number" value={this.state.lat} onChange={(event) => this.setState({lat: event.target.value})}/>
        <br/>
        <input type="number" value={this.state.long} onChange={(event) => this.setState({long: event.target.value})}/>
        <br />
        <button onClick={(event) => this.enterCoordinates()}>
          Calculate Address
        </button>
      <div>
        {this.state.address}
      </div>
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

export default App;
