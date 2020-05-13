import React, { ChangeEvent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ContactsIcon from '@material-ui/icons/Contacts';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GoogleBtn from '../GoogleSignIn';
import { Link, useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export const ResponsiveDrawer = (props: {
	container?: any;
	onUploadClick: (...args: any[]) => Promise<number>;
}) => {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	let history = useHistory();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	// This is pretty hacky but useHistory cant be used outside the parent route

	const onChange = async (e: ChangeEvent) => {
		history.push('/Loading');
		const requestSucceeded = await props.onUploadClick(e);

		if (requestSucceeded === 0) {
			history.push('/Data/Songs');
		} else {
			history.push('/BadData');
		}
	};

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{['Upload'].map((text, index) => (
					<label key={text} htmlFor="contained-button-file1">
						<ListItem button key={text}>
							<ListItemIcon>{<CloudUploadIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					</label>
				))}
			</List>
			<Divider />
			<List>
				{['Songs', 'Artists'].map((text, index) => (
					<Link
						to={index % 2 === 0 ? '/Data/Songs' : '/Data/Artists'}
						style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <MusicNoteIcon /> : <ContactsIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					</Link>
				))}
				<GoogleBtn />
			</List>
		</div>
	);

	return (
		<div className={classes.root} style={{ padding: '1vh' }}>
			<input
				accept="JSON/*"
				id="contained-button-file1"
				multiple
				type="File"
				onChange={onChange}
				style={{ display: 'none' }}
			/>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Google Play Music Stats
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
};
