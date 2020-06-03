import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Artist } from '../../Interfaces/Types';

const useStyles = makeStyles({
	table: {
		minWidth: '35vw',
		maxWidth: 650,
	},
});

type ArtistDataEntry = { artist: string; numberOfListens: number };
type ArtistData = Array<ArtistDataEntry>;

function createArtistData(name: string, numberOfListens: number): Artist {
	return { name, numberOfListens };
}

export const ArtistTable = ({ data }: { data: ArtistData }) => {
	const classes: Record<'table', string> = useStyles();
	const artists: Array<Artist> = [];

	data?.forEach((item: ArtistDataEntry) => {
		artists.push(createArtistData(item.artist, item.numberOfListens));
	});
	return (
		<div className="customTable">
			<TableContainer component={Paper} style={{ margin: 'auto' }}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Artist</TableCell>
							<TableCell align="right">Listens</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{artists.map((artist: Artist) => (
							<TableRow key={artist.name}>
								<TableCell component="th" scope="row">
									{artist.name}
								</TableCell>
								<TableCell align="right">{artist.numberOfListens}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
