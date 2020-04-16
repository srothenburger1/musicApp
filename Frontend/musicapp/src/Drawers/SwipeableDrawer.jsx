import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ContactsIcon from '@material-ui/icons/Contacts'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const SwipeableTemporaryDrawer = ({onUploadClick, onRouteChange}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const fullList = side => (
    
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
   
    <List>
        {['Upload Data'].map((text, index) => (
        <label key = {text} htmlFor="contained-button-file1">
          <ListItem button key={text}>
            <ListItemIcon>{<CloudUploadIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          </label>
        ))}
      </List>
      <Divider />
      <List>
        {['Top Songs', 'Top Artists'].map((text, index) => (
          <ListItem button key={text} onClick = {()=>{onRouteChange(index % 2 === 0 ? "topSongs" : "topArtists")}}>
            <ListItemIcon>{index % 2 === 0 ? <MusicNoteIcon /> : <ContactsIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
    <input
        accept="JSON/*"
        className={classes.input}
        id="contained-button-file1"
        multiple
        type="File"
        onChange={onUploadClick}
        style={{display:"none"}}
      /> 
      <Button variant="contained" color="primary"  onClick={toggleDrawer('top', true)}>Menu</Button>
      <SwipeableDrawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer('top', false)}
        onOpen={toggleDrawer('top', true)}
      >
        {fullList('top')}
      </SwipeableDrawer>
    </div>
  );
}
export {SwipeableTemporaryDrawer};