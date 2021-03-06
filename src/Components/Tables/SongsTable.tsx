import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Song } from '../../Interfaces/Types';
import '../../index.css';

const useStyles = makeStyles({
	table: {
		// maxWidth: '90%',
		minWidth: '35vw',
		// display: 'block',
	},
});

function createSongData(
	title: string,
	artist: string,
	numberOfListens: number
): Song {
	return { title, artist, numberOfListens };
}

type SongsDataEntry = {
	title: string;
	artist: string;
	numberOfListens: number;
};
type SongsData = Array<SongsDataEntry>;

const SongsTable = ({ data }: { data: SongsData }) => {
	const classes = useStyles();
	const songs: Array<Song> = [];

	data?.forEach((item: SongsDataEntry) => {
		songs.push(createSongData(item.title, item.artist, item.numberOfListens));
	});

	return (
		<div className="customTable">
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="Song Table">
					<TableHead>
						<TableRow key={'song'}>
							<TableCell>Song</TableCell>
							<TableCell align="right">Artist</TableCell>
							<TableCell align="right">Listens</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{songs.map((song: Song) => (
							<TableRow key={song.title}>
								<TableCell component="th" scope="row">
									{song.title}
								</TableCell>
								<TableCell align="right">{song.artist}</TableCell>
								<TableCell align="right">{song.numberOfListens}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export { SongsTable };
