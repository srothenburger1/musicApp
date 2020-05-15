import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ContactsIcon from '@material-ui/icons/Contacts';
import HelpIcon from '@material-ui/icons/Help';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	stickToBottom: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
	},
});

export default function LabelBottomNavigation(props: any) {
	const classes = useStyles();
	const [value, setValue] = React.useState('Help');
	let history = useHistory();

	const buildFileSelector = () => {
		const fileSelector = document.createElement('input');
		fileSelector.setAttribute('type', 'file');
		fileSelector.setAttribute('multiple', 'multiple');
		fileSelector.setAttribute('accept', 'JSON/*');
		fileSelector.onchange = handleFileInput;

		return fileSelector;
	};

	const handleFileSelect = (e: any) => {
		e.preventDefault();
		buildFileSelector().click();
	};

	const handleFileInput = async (e: any) => {
		history.push('/Loading');
		const requestSucceeded = await props.onUploadClick(e);

		if (requestSucceeded === 0) {
			history.push('/Songs');
			setValue('Songs');
		} else {
			history.push('/BadData');
		}
	};

	const handleNavClick = (event: React.ChangeEvent<{}>, newValue: string) => {
		if (newValue === 'Upload') {
			handleFileSelect(event);
		} else {
			history.push(`/${newValue}`);
			setValue(newValue);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('musicData')) {
			history.push('/Songs');
			setValue('Songs');
		} else {
			history.push('/Help');
			setValue('Help');
		}
	}, []);

	return (
		<BottomNavigation
			value={value}
			onChange={handleNavClick}
			className={classes.stickToBottom}>
			<BottomNavigationAction
				label="Upload"
				value="Upload"
				icon={<CloudUploadIcon />}
			/>

			<BottomNavigationAction
				label="Songs"
				value="Songs"
				icon={<MusicNoteIcon />}
			/>
			<BottomNavigationAction
				label="Artists"
				value="Artists"
				icon={<ContactsIcon />}
			/>
			<BottomNavigationAction label="Help" value="Help" icon={<HelpIcon />} />
		</BottomNavigation>
	);
}
