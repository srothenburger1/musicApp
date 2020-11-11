//@ts-nocheck

import React, { useState, useEffect } from 'react';
import './App.css';
import { SongsTable } from './Components/Tables/SongsTable';
import { ArtistTable } from './Components/Tables/ArtistTable';
import { CountsTable } from './Components/Tables/CountsTable';
import LoadingCircle from './Components/LoadingCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HelpComp } from './Components/HelpComp';
import LabelBottomNavigation from './Components/Nav/BottomNav';
import { UserActivities } from './Interfaces/Types';
import { sortYTData } from './Services/YTMusicService';
import { sortMusicData } from './Services/MusicStatsService';

export const App = () => {
	const today = new Date(),
		targetYear =
			today.getMonth() < 11 ? today.getFullYear() - 1 : today.getFullYear(),
		[songData, songDataSet] = useState<UserActivities>();

	const onUploadClick = async (event: any) => {
		const file = await event.target.files[0].text();

		const musicData = file.includes('YouTube Music')
			? sortYTData({ file: file, year: 2020 })
			: sortMusicData({ file: file, year: 2020 });

		try {
			songDataSet(musicData);
			sessionStorage.clear();
			sessionStorage.setItem('musicData', JSON.stringify(musicData));
		} catch (error) {
			console.log(error);
		}

		if (songData?.songCount > 0) {
			return 0;
		} else {
			return 1;
		}
	};
	useEffect(() => {
		if (sessionStorage.getItem('musicData')) {
			const data = JSON.parse(sessionStorage.getItem('musicData') as string);
			songDataSet(data);
		}
	}, []);
	return (
		<div className="App">
			<section>
				<AppBar position="static">
					<Toolbar>
						<Typography>{targetYear} Music Stats</Typography>
					</Toolbar>
				</AppBar>
			</section>
			<Router>
				<Switch>
					<Route path="/Loading">
						<LoadingCircle />
					</Route>
					<Route path="/Artists">
						{songData != null && songData.artistCount !== 0 ? (
							<>
								<section className="table">
									<CountsTable
										songCount={songData?.songCount}
										artistCount={songData?.artistCount}
									/>
								</section>
								<section>
									<ArtistTable data={songData?.artists} />
								</section>
							</>
						) : null}
					</Route>
					<Route path="/Songs">
						{songData != null && songData.songCount !== 0 ? (
							<>
								<section className="table">
									<CountsTable
										songCount={songData?.songCount}
										artistCount={songData?.artistCount}
									/>
								</section>
								<section>
									<SongsTable data={songData?.songs} />
								</section>
							</>
						) : null}
					</Route>
					<Route path="/Help">
						<section>
							<HelpComp />
						</section>
					</Route>
				</Switch>
				{/* Nav Bar */}
				<section>
					<LabelBottomNavigation onUploadClick={onUploadClick} />
				</section>
			</Router>
		</div>
	);
};
