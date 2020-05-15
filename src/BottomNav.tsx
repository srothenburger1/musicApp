import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ContactsIcon from '@material-ui/icons/Contacts';
import HelpIcon from '@material-ui/icons/Help';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useHistory } from 'react-router-dom';
//@ts-ignore
import { FilePicker } from 'react-file-picker';
import { useFilePicker } from 'react-sage';

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

	const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
		// if (newValue === 'Upload') {
		// 	handleInput(event);
		// }
		history.push(`/${newValue}`);
		setValue(newValue);
	};

	//TODO: make a useeffect to set the route to help

	const handleInput = async (e: React.ChangeEvent<{}>) => {
		history.push('/Loading');
		const requestSucceeded = await props.onUploadClick(e);

		if (requestSucceeded === 0) {
			history.push('/Data/Songs');
		} else {
			history.push('/BadData');
		}
	};

	return (
		<>
			<input
				accept="JSON/*"
				id="contained-button-file1"
				multiple
				type="File"
				onChange={handleInput}
				style={{ display: 'none' }}
			/>
			<BottomNavigation
				value={value}
				onChange={handleChange}
				className={classes.stickToBottom}>
				{/* <FilePicker
					extensions={['json']}
					onChange={(e: any) => handleInput(e)}
					onError={(e: Error) => console.log(e)}> */}
				<BottomNavigationAction
					label="Upload"
					value="Upload"
					icon={
						<label key="upload" htmlFor="contained-button-file1">
							<CloudUploadIcon />
						</label>
					}
				/>
				{/* </FilePicker> */}

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
		</>
	);
}
