import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth:650
  },
});

function createData(artist:any, listens:any) {
  return { artist, listens };
}

const ArtistTable = ({data}:any) => {
  const classes = useStyles();
const rows:any = [];

data.forEach((element:any) => {
  rows.push(createData(element[0],element[1]))
});
  return (
    <div style={{display:"inline-block"}}>
    <TableContainer component={Paper} style={{ margin:"auto"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Artist</TableCell>
            <TableCell align="right">Listens</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <TableRow key={row.artist}>
              <TableCell component="th" scope="row">
                {row.artist}
              </TableCell>
              <TableCell align="right">{row.listens}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export {ArtistTable};