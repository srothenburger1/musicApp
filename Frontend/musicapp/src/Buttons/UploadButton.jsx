import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

 const UploadButtons = ({onInputChange}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="JSON/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="File"
        onChange={onInputChange}
      />
      <label htmlFor="contained-button-file">
        <Button 
        variant="contained" 
        color="primary" 
        component="span"
        >
          Upload Google Play Data
        </Button>
      </label>
    </div>
  );
}
export default UploadButtons;