import React from 'react';
import './helpComp.css';

export const HelpComp = () => {
	return (
		<>
			<div className="grid">
				<p>
					Step 1 — getting the data out of google Nearly every interaction you
					have with google is stored with them and you do have the ability to
					extract and view those interactions. We’re going to use such an
					extract to get your listening statistics. You have to go into your
					google account and get it. Here’s how: Visit this URL:
					https://takeout.google.com/settings/takeout?pli=1 You’re going to want
					to create a new archive, available under the heading “CREATE A NEW
					ARCHIVE.” You don’t want to download all your activity, so the first
					thing you’ll want to do is hit that “Deselect All” button, circled red
					in the screenshot below.
				</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*nfL2xPv-MfU8UDl1P7GXLA.png'
					}></img>
				<p>
					After you click it, all those checkboxes will change to unselected.
					Then, scroll down until you find an option called “My Activity.”Click
					that checkbox, circled for in red for you here. (Do not bother with
					the “Google Play Music” option here.)
				</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*FrjKzQac2b58Q-ed4YfzPg.png'
					}></img>
				<p>
					Once you’ve checked that, click the thing that says “All activity data
					included”.
				</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*vEFxIue9kkTVlhg5Eywy1Q.png'
					}></img>
				<p>This will pop up. Click “Deselect All.”</p>
				<img
					src={
						'https://miro.medium.com/max/1360/1*VmDGEz-YWExekVjXdiVLpg.png'
					}></img>
				<p>
					All the checkboxes will be unselected. Then scroll down until you find
					“Google Play Music” and check it. (This is the “Google Play Music”
					that you want.)
				</p>
				<img
					src={
						'https://miro.medium.com/max/1212/1*7Uye1-epKOqKYxvFkfpzmA.png'
					}></img>
				<p>At the very bottom, click OK.</p>
				<img
					src={
						'https://miro.medium.com/max/1336/1*EpCwVZ-I9PanRGgtcc_zJQ.png'
					}></img>
				<p>
					Back under “My Activity”, the thing that used to say “All Activity”
					should now say “1 product selected.” Next to it is a button that says
					something like “Multiple Formats.” Click it.
				</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*jtwZAn8erZsJ65sRPQmfrw.png'
					}></img>
				<p>
					In the popup that appears, next to Activity Records, there is a
					dropdown that probably says, “HTML”. Click it.
				</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*qOc58qD3x4Cji_KqB1f0_g.png'
					}></img>
				<p>Select “JSON.”</p>
				<img
					src={
						'https://miro.medium.com/max/1364/1*5aCrGs5seEqiHXFj4ddSKw.png'
					}></img>
				<p>Click “OK.”</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*e9XsbZ-LnE5t53NM7MoC5Q.png'
					}></img>
				<p>It should now look like something similar to this.</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*Rho1TIL0iHkNw6CUda_srA.png'
					}></img>
				<p>Now, scroll to the bottom of the page and click “Next step.”</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*AXngbgtqjSatAm_efYQPfg.png'
					}></img>
				<p>
					Then you’ll see something like this. Select the options that make
					sense to you. Sending download link via email and using a zip file are
					probably easiest. These are the default options. If you listen a lot
					(and I mean a TON), maybe increase the archive size so that it’s not
					split up. Then, click “Create archive.”
				</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*hpfFKZINGic8r-ZPx7VuuA.png'
					}></img>
				<p>You’ll get something like this.</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*Pxs4pMt_QuYxaHEnYeqYgQ.png'
					}></img>
				<p>
					Now you have to wait. I did it twice this year — one time it took an
					hour, the other time it took a minute. I don’t know how long it’ll
					take for you. When it does finish, you’ll get an email like this:
				</p>
				<img
					src={
						'https://miro.medium.com/max/1400/1*iVO2_cQuRy12jXPzvRQVWg.png'
					}></img>
				<p>
					Click that blue Download archive button. It’ll probably have you log
					in, for security purposes. After you enter your password, the download
					will happen automatically. If you downloaded a zip file, and if you’re
					on OSX, when you double-click it, it’ll create a directory called
					Takeout, and if you expand that directory, you’ll see this.
				</p>
				<img
					src={
						'https://miro.medium.com/max/1176/1*r6bZ66xtjtW4Qr5QvAucQw.png'
					}></img>
				<p>
					It is that file right there -MyActivity.json — which is what you
					want.)
				</p>
			</div>
		</>
	);
};
