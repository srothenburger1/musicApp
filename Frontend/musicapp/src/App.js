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

  onUploadClick = event => {
    let data = event.target.files[0];
    var formData = new FormData();
    formData.append("id", "123");
    formData.append("year", "2020");
    formData.append("path", data);    
    
     axios.post("http://localhost:5000/upload", formData, { // receive two parameter endpoint url ,form data 
    })
    .then(res => { // then print response status
      console.log(res.status)
    })   
  };

  onTopSongsClick = event => {
    axios.post("http://localhost:5000/topsongs", {id:"123"})
    .then(response => {this.setState({topSongsData : response.data})})

    axios.post("http://localhost:5000/allsongscount", {id:"123"})
    .then(response => {this.setState({allSongsCount : response.data, route:"topSongs"})})
  };

  onTopArtistsClick = event => {
    axios.post("http://localhost:5000/topartists", {id:"123"})
    .then(response => {this.setState({topArtistsData : response.data}, console.log(response.data))})

    axios.post("http://localhost:5000/allartistscount", {id:"123"})
    .then(response => {this.setState({allArtistsCount : response.data, route:"topArtists"})})
  };
}

export default App;
