import React, { Component } from 'react';
import './App.css';
import { SwipeableTemporaryDrawer } from "./Drawers/SwipeableDrawer";
import axios from 'axios';
import {SongsTable} from './Tables/SongsTable'
import {ArtistTable} from './Tables/ArtistTable'



class App extends Component {
  constructor(){
    super();
    this.state = {
      data: null,
      input: null,
      file: null,
      topSongsData: null,
      topArtistsData: null,
      allSongsCount: null,
      allArtistsCount: null
    }
  }
  render(){
  return (
    <div className="App">
    <br/>
    <SwipeableTemporaryDrawer
      onUploadClick = {this.onUploadClick}
      onTopSongsClick = {this.onTopSongsClick}
      onTopArtistsClick = {this.onTopArtistsClick}
      onRouteChange = {this.onRouteChange}

    />
    <br/>
      {this.state.route === "topSongs" 
      && this.state.topSongsData != null
      ?<div><SongsTable data={this.state.topSongsData} title="Song"/></div>
      : this.state.route === "topArtists" 
      && this.state.topArtistsData != null 
      ? <div><ArtistTable data={this.state.topArtistsData} title="Song"/></div>
      :<div>No Data</div>
        }
    </div>
  );
  
}

onRouteChange = route => {
  this.setState({route:route})
}

  onUploadClick = event => {
    let data = event.target.files[0];
    var formData = new FormData();
    formData.append("id", "123");
    formData.append("year", "2020");
    formData.append("path", data);    
    
     axios.post("http://localhost:5000/upload", formData, { // receive two parameter endpoint url ,form data 
    })
    .then(res => {this.setState({
       topArtistsData: res.data.artistsSorted
      , topSongsData: res.data.titlesSorted
      , allArtistsCount: res.data.totalArtists
      , allSongsCount: res.data.allSongsCount}
      )
    this.onRouteChange("topSongs")
    }
      )   
  };

  
}

export default App;
