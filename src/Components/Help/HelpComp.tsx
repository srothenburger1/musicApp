import React from 'react';
import { Typography } from '@material-ui/core';
import './help.css'
export const HelpComp = () => {
	return (
		<>
			<div>
				<Typography variant="h6">
					Steps to get data
				</Typography>

				<ol>
					<li>
						Go to: 
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://takeout.google.com/settings/takeout?pli=1">
							https://takeout.google.com/settings/takeout?pli=1
						</a>
					</li>
					<br />
					<li>At the top deselect all</li>
					<img src={'/1.png'} alt='Instructional' />
					<br />
					<li>All the way at the bottom select Youtube and Youtube Music</li>
					<img src={'/2.png'} alt='Instructional' />
					<br />
					<li>Click the button that says "All Youtube data included"</li>
					<img src={'/3.png'} alt='Instructional' />
					<br />
					<li>Click deselect all</li>
					<img src={'/4.png'} alt='Instructional' />
					<li>Reselect history</li>
					<img src={'/5.png'} alt='Instructional' />
					<li>Click OK</li>
					<img src={'/OK.png'} alt='Instructional' />
					<br />
					<li>Click multiple formats, and in the row that says history</li>
					<img src={'/6.png'} alt='Instructional' />
					<li>Click HTML and change it to JSON. Click OK</li>
					<img src={'/7.png'} alt='Instructional' />
					<br />
					<li>Click next step</li>
					<img src={'/8.png'} alt='Instructional' />
					<br />
					<li>Click create export</li>
					<img src={'/9.png'} alt='Instructional' />
					<br />
					<li>Google will now email you the file needed.</li>
					<br />
					<li>In your email, download the file and unzip it</li>
					<img src={'/10.png'} alt='Instructional' />
					<img src={'/11.png'} alt='Instructional' />
					<img src={'/12.png'} alt='Instructional' />
					<img src={'/13.png'} alt='Instructional' />
					<br />
					<li>Click through the folders. (Takeout -{'>'} YouTube and Youtube Music -{'>'} history)</li>
					<br />
					<li>watch-history.json is the file you will want to upload</li>
					<img src={'/14.png'} alt='Instructional' />
				</ol>
			</div>
		</>
	);
};
