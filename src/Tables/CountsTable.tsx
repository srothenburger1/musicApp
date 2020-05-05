import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Counts from '../Interfaces/Counts'

const useStyles = makeStyles({
  table: {
    minWidth: '100%'
    // maxWidth: '90%',
    // display:'blocker'
  },
});

const CountsTable = (counts:Counts) => {

  const classes:Record<"table", string> = useStyles();

  return (
      <div className="customTable">
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
                {counts.songCount}
              </TableCell>
              <TableCell align="right">{counts.artistCount}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
export {CountsTable};