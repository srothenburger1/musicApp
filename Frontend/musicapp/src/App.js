import React, { Component } from 'react';
import './App.css';
import { SwipeableTemporaryDrawer } from "./Drawers/SwipeableDrawer";
import axios from 'axios';


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
      {this.state.route === "topSongs" && this.state.topSongsData != null?this.state.topSongsData.map((item,index)=>{
        return(<div><p>{item[0]}</p><p>{item[1]}</p><p>{item[2]}</p></div>)
        }
        ): this.state.route === "topArtists" && this.state.topArtistsData != null? <div>top Artists</div>
        
        :<div>No Data Uploaded</div>
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
    // .then(response => {console.log(response.data)})
  };

  onTopArtistsClick = event => {
    axios.post("http://localhost:5000/topartists", {id:"123"})
    .then(response => {this.setState({topArtistsData : response.data})})

    axios.post("http://localhost:5000/allartistscount", {id:"123"})
    .then(response => {this.setState({allArtistsCount : response.data, route:"topArtists"})})
    // .then(response => {console.log(response.data)})
  };
}

export default App;
