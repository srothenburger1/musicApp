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
  },
});

const CountsTable = ({songCount, artistCount}:any) => {
  const classes = useStyles();

  return (
      <div style={{display:"inline-block"}}>
    <TableContainer component={Paper} style={{margin:"auto"}}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Total different songs</TableCell>
            <TableCell align="right">Total different artists</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>      
            <TableRow key={"Counts"}>
              <TableCell component="th" scope="row">
                {songCount}
              </TableCell>
              <TableCell align="right">{artistCount}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
export {CountsTable};