import React, { useState, useEffect } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
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

export const App = () => {
	const today = new Date(),
		targetYear =
			today.getMonth() < 11 ? today.getFullYear() - 1 : today.getFullYear(),
		[songData, songDataSet] = useState<UserActivities>();

	const onUploadClick = async (event: any) => {
		let formData = new FormData();
		formData.append('path', event.target.files[0]);

		const result: AxiosResponse<UserActivities> = await axios.post(
			' https://mighty-taiga-81224.herokuapp.com/upload',
			formData,
			{}
		);
		try {
			songDataSet(result.data);
			sessionStorage.clear();
			sessionStorage.setItem('musicData', JSON.stringify(result.data));
		} catch (error) {
			console.log(error);
		}
		if (result) {
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
