import React, { useState, useEffect } from "react";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { SongsTable } from "./Tables/SongsTable";
import { ArtistTable } from "./Tables/ArtistTable";
import { CountsTable } from "./Tables/CountsTable";
import { ResponsiveDrawer } from "./Drawers/ResponsiveDrawer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  const [TopSongsData, setTopSongsData] = useState(null),
    [TopArtistsData, setTopArtistsData] = useState(null),
    [AllSongsCount, setAllSongsCount] = useState("0"),
    [AllArtistsCount, setAllArtistsCount] = useState("0");

  useEffect(() => {
    if (localStorage.getItem("musicData")) {
      const data = JSON.parse(localStorage.getItem("musicData") as string);
      setTopArtistsData(data.artistsSorted);
      setTopSongsData(data.titlesSorted);
      setAllArtistsCount(data.totalArtists);
      setAllSongsCount(data.totalTitles);
    }
  }, []);

  const onUploadClick = async (event: any) => {
    let formData: FormData = new FormData();
    formData.append("id", "123");
    formData.append("year", "2019");
    formData.append("path", event.target.files[0]);

    const result = await axios.post(
      " https://mighty-taiga-81224.herokuapp.com/upload",
      formData,
      {}
    );
    try {
      setTopArtistsData(result.data.artistsSorted);
      setTopSongsData(result.data.titlesSorted);
      setAllArtistsCount(result.data.totalArtists);
      setAllSongsCount(result.data.totalTitles);
      localStorage.clear();
      localStorage.setItem("musicData", JSON.stringify(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Router>
        <ResponsiveDrawer onUploadClick={onUploadClick} />

        {AllSongsCount !== "0" ? (
          <div style={{ paddingTop: "4rem" }}>
            <CountsTable
              songCount={AllSongsCount!}
              artistCount={AllArtistsCount!}
            />
          </div>
        ) : (
          <div style={{ paddingTop: "40rem" }}></div>
        )}
        <Switch>
          <Route path="/Artists">
            {TopArtistsData !== null ? (
              <ArtistTable data={TopArtistsData!} />
            ) : null}
          </Route>
          <Route path="/Songs">
            {AllSongsCount !== "0" ? <SongsTable data={TopSongsData!} /> : null}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
