import React, { Component } from 'react';
import './App.css';
import { SwipeableTemporaryDrawer } from "./Drawers/SwipeableDrawer";
import axios from 'axios';
import {SongsTable} from './Tables/SongsTable'
import {ArtistTable} from './Tables/ArtistTable'
import { CountsTable } from "./Tables/CountsTable";



class App extends Component {
  constructor(){
    super();
    this.state = this.initState;
  }
   initState = {
    data: null,
    input: null,
    file: null,
    topSongsData: null,
    topArtistsData: null,
    allSongsCount: "0",
    allArtistsCount: "0"
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
      {this.state.route !== "badData" 
      && this.state.allSongsCount !== "0"
      ? <div>
      <CountsTable
        songCount = {this.state.allSongsCount}
        artistCount = {this.state.allArtistsCount}

      />
      </div>
      :<div></div>}
      <br/>
        {this.state.route === "topSongs" 
        && this.state.allSongsCount !== "0"
        ?<div><SongsTable data={this.state.topSongsData} title="Song"/></div>
        : this.state.route === "topArtists" 
        && this.state.allArtistsCount !== "0" 
        ? <div><ArtistTable data={this.state.topArtistsData} title="Song"/></div>
        : this.state.route === "badData"
        ? <div>Invalid Input</div>
        : <div>No Data</div>
          }
      </div>
    );
  }

  onRouteChange = route => {
    this.setState({route:route})
  }

  onUploadClick = event => {
    this.setState(this.initState)
    let file = event.target.files[0];
    var formData = new FormData();
    formData.append("id", "123");
    formData.append("year", "2019");
    formData.append("path", file);
    
    axios.post("http://localhost:5000/upload", formData, { 
    })
    .then(res => {
      console.log("Data: ", res.data);
      this.setState(
      {
       topArtistsData: res.data.artistsSorted
      , topSongsData: res.data.titlesSorted
      , allArtistsCount: res.data.totalArtists
      , allSongsCount: res.data.totalTitles
      }
      )
    this.onRouteChange("topSongs")
    })
    .catch(error => {
      console.log(error)
    this.onRouteChange("badData")
    })
  };
}

export default App;
