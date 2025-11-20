import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import CenterListRow from './CenterListRow';
import CenterTableHead from './CenterTableHead';
import CenterTableToolbar from './CenterTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import { getCentros } from 'redux/actions/Centros';

const CenterModule = ({ history }) => {
  const classes = useStyles();

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [fetched, setFetched] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isFilterApplied, setFilterApplied] = useState(false);

  const dispatch = useDispatch();
  const { listaCentros = [] } = useSelector(state => state.centros);

  useEffect(() => {
    dispatch(getCentros());
    setFetched(true);
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.length > 0 && selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = data => {
    history.push(`/center/center/${data.id}`);
  };

  
  useEffect(() => {
    console.log("centers", listaCentros);
  }, [listaCentros])
  

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CenterTableToolbar />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <CenterTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={listaCentros.length}
            />
            <TableBody>
              {listaCentros.length >0 ? (
                stableSort(listaCentros, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <CenterListRow
                      key={index}
                      row={row}
                      onEdit={handleEdit}
                      onRowClick={handleRowClick}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>No existen registros con ese filtro.</NoRecordFound>
                    ) : (
                      <NoRecordFound>{fetched ? 'Sin Centros.' : 'Cargando Centros...'}</NoRecordFound>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={listaCentros.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </div>
  );
};

export default CenterModule;
