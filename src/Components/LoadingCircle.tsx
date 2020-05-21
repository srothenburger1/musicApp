import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			paddingLeft: '50%',
			paddingTop: '20%',
			'& > * + *': {
				marginLeft: theme.spacing(2),
			},
		},
	})
);

export default function LoadingCircle() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
			{/* <CircularProgress color="secondary" /> */}
		</div>
	);
}
