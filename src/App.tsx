import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { SongsTable } from './Tables/SongsTable';
import { ArtistTable } from './Tables/ArtistTable';
import { CountsTable } from './Tables/CountsTable';
import LoadingCircle from './LoadingCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HelpComp } from './HelpComp';
import LabelBottomNavigation from './BottomNav';

export const App = () => {
	const [TopSongsData, setTopSongsData] = useState(null),
		[TopArtistsData, setTopArtistsData] = useState(null),
		[AllSongsCount, setAllSongsCount] = useState('0'),
		[AllArtistsCount, setAllArtistsCount] = useState('0');

	useEffect(() => {
		if (localStorage.getItem('musicData')) {
			const data = JSON.parse(localStorage.getItem('musicData') as string);
			setTopArtistsData(data.artistsSorted);
			setTopSongsData(data.titlesSorted);
			setAllArtistsCount(data.totalArtists);
			setAllSongsCount(data.totalTitles);
		}
	}, []);

	const onUploadClick = async (event: any) => {
		let formData = new FormData();
		formData.append('id', '123');
		formData.append('year', '2019');
		formData.append('path', event.target.files[0]);

		const result = await axios.post(
			' https://mighty-taiga-81224.herokuapp.com/upload',
			formData,
			{}
		);
		try {
			setTopArtistsData(result.data.artistsSorted);
			setTopSongsData(result.data.titlesSorted);
			setAllArtistsCount(result.data.totalArtists);
			setAllSongsCount(result.data.totalTitles);
			localStorage.clear();
			localStorage.setItem('musicData', JSON.stringify(result.data));
		} catch (error) {
			console.log(error);
		}
		if (result) {
			return 0;
		} else {
			return 1;
		}
	};

	return (
		<div className="App">
			<section>
				<AppBar position="static">
					<Toolbar>
						<Typography>Play Music Stats</Typography>
					</Toolbar>
				</AppBar>
			</section>
			<Router>
				<Switch>
					<Route path="/Loading">
						<LoadingCircle />
					</Route>
					<Route path="/Artists">
						{TopArtistsData !== null ? (
							<>
								<section className="table">
									<CountsTable
										songCount={AllSongsCount!}
										artistCount={AllArtistsCount!}
									/>
								</section>
								<section>
									<ArtistTable data={TopArtistsData!} />
								</section>
							</>
						) : null}
					</Route>
					<Route path="/Songs">
						{AllSongsCount !== '0' ? (
							<>
								<section className="table">
									<CountsTable
										songCount={AllSongsCount!}
										artistCount={AllArtistsCount!}
									/>
								</section>
								<section>
									<SongsTable data={TopSongsData!} />
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
