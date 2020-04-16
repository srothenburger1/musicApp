import React, { useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { SongsTable } from './Tables/SongsTable'
import { ArtistTable } from './Tables/ArtistTable'
import { CountsTable } from "./Tables/CountsTable";
import { ResponsiveDrawer } from './Drawers/ResponsiveDrawer'
import { Routes } from "./Enums/Routes";

export default function App() {
  const [TopSongsData, setTopSongsData] = useState(null)
        ,[TopArtistsData, setTopArtistsData] = useState(null)
        ,[AllSongsCount, setAllSongsCount] = useState("0")
        ,[AllArtistsCount, setAllArtistsCount] = useState("0")
        ,[Route, setRoute] = useState(Routes.Home);
  

  const onUploadClick = (event: any): void => {
    let file = (event.target).files[0];
    let formData: FormData = new FormData();
    formData.append("id", "123");
    formData.append("year", "2019");
    formData.append("path", file);
    
    axios.post("http://localhost:5000/upload", formData, { 
    })
    .then((res:AxiosResponse<any>) => {  
      setTopArtistsData(res.data.artistsSorted);
      setTopSongsData(res.data.titlesSorted);
      setAllArtistsCount(res.data.totalArtists);
      setAllSongsCount(res.data.totalTitles);
      setRoute(Routes.TopSongs)
    })
    .catch((error:Error) => {
      console.log(error)
    setRoute(Routes.BadData)
    })
  };

  return (
  <div className="App">
      <ResponsiveDrawer
        onUploadClick = {onUploadClick}
        onRouteChange = {setRoute}
      />
      {
      Route !== Routes.BadData 
      && AllSongsCount !== "0"
      ? <div style = {{"paddingTop":"4rem"}}>
      <CountsTable
        songCount = {AllSongsCount!}
        artistCount = {AllArtistsCount!}
      />
      </div>
      :<div style = {{"paddingTop":"40rem"}}></div>
      }
      <br/>
        {Route === Routes.TopSongs 
        && AllSongsCount !== "0"
        ?<div><SongsTable data={TopSongsData!}/></div>
        : Route === Routes.TopArtists 
        && TopArtistsData !== null 
        ? <div><ArtistTable data={TopArtistsData!}/></div>
        : Route === Routes.BadData
        ? <div>Invalid Input</div>
        : <div>No Data</div>
          }
      </div>
  ); 
  }