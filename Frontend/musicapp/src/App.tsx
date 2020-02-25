import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import {SongsTable} from './Tables/SongsTable'
import {ArtistTable} from './Tables/ArtistTable'
import { CountsTable } from "./Tables/CountsTable";
import ResponsiveDrawer from './Drawers/ResponsiveDrawer'

export default function App(props: any): any {
  
  const [TopSongsData, setTopSongsData] = useState(null)
        ,[TopArtistsData, setTopArtistsData] = useState(null)
        ,[AllSongsCount, setAllSongsCount] = useState("0")
        ,[AllArtistsCount, setAllArtistsCount] = useState("0")
        ,[Route, setRoute] = useState("home");
  
  const onUploadClick: any = (event: any) => {
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append("id", "123");
    formData.append("year", "2019");
    formData.append("path", file);
    
    axios.post("http://localhost:5000/upload", formData, { 
    })
    .then((res:any) => {  
      setTopArtistsData(res.data.artistsSorted);
      setTopSongsData(res.data.titlesSorted);
      setAllArtistsCount(res.data.totalArtists);
      setAllSongsCount(res.data.totalTitles);
      setRoute("topSongs")
    })
    .catch((error:Error) => {
      console.log(error)
    setRoute("badData")
    })
  };


  return (
  <div className="App">
      <br/>
      <ResponsiveDrawer
        onUploadClick = {onUploadClick}
        onRouteChange = {setRoute}
      />
      {Route !== "badData" 
      && AllSongsCount !== "0"
      ? <div style = {{"paddingTop":"6vh"}}>
      <CountsTable
        songCount = {AllSongsCount}
        artistCount = {AllArtistsCount}
      />
      </div>
      :<div style = {{"paddingTop":"4.5vh"}}></div>}
      <br/>
        {Route === "topSongs" 
        && AllSongsCount !== "0"
        ?<div><SongsTable data={TopSongsData} title="Song"/></div>
        : Route === "topArtists" 
        && AllArtistsCount !== "0" 
        ? <div><ArtistTable data={TopArtistsData} title="Song"/></div>
        : Route === "badData"
        ? <div>Invalid Input</div>
        : <div>No Data</div>
          }
      </div>
  );
    
  }

  
//#region old
// class App extends Component {
//   constructor(){
//     super();
//     this.state = this.initState;
//   }
  
//   initState = {
//     data: null,
//     input: null,
//     file: null,
//     topSongsData: null,
//     topArtistsData: null,
//     allSongsCount: "0",
//     allArtistsCount: "0"
//   }
//   render(){


//   return (
//       <div className="App">
//       <br/>
//       <ResponsiveDrawer
//         onUploadClick = {this.onUploadClick}
//         onRouteChange = {this.onRouteChange}
//       />
//       {this.state.route !== "badData" 
//       && this.state.allSongsCount !== "0"
//       ? <div style = {{"paddingTop":"6vh"}}>
//       <CountsTable
//         songCount = {this.state.allSongsCount}
//         artistCount = {this.state.allArtistsCount}
//       />
//       </div>
//       :<div style = {{"paddingTop":"4.5vh"}}></div>}
//       <br/>
//         {this.state.route === "topSongs" 
//         && this.state.allSongsCount !== "0"
//         ?<div><SongsTable data={this.state.topSongsData} title="Song"/></div>
//         : this.state.route === "topArtists" 
//         && this.state.allArtistsCount !== "0" 
//         ? <div><ArtistTable data={this.state.topArtistsData} title="Song"/></div>
//         : this.state.route === "badData"
//         ? <div>Invalid Input</div>
//         : <div>No Data</div>
//           }
//       </div>
//     );
//   }

//   onRouteChange = route => {
//     this.setState({route:route})
//   }

//   onUploadClick = event => {
//     this.setState(this.initState)
//     let file = event.target.files[0];
//     var formData = new FormData();
//     formData.append("id", "123");
//     formData.append("year", "2019");
//     formData.append("path", file);
    
//     axios.post("http://localhost:5000/upload", formData, { 
//     })
//     .then(res => {
//       console.log("Data: ", res.data);
//       this.setState(
//       {
//        topArtistsData: res.data.artistsSorted
//       , topSongsData: res.data.titlesSorted
//       , allArtistsCount: res.data.totalArtists
//       , allSongsCount: res.data.totalTitles
//       }
//       )
//     this.onRouteChange("topSongs")
//     })
//     .catch(error => {
//       console.log(error)
//     this.onRouteChange("badData")
//     })
//   };
// }
//#endregion

// export default App;