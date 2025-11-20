import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'centro',
    numeric: false,
    disablePadding: true,
    label: 'Centro',
  },
  {
    id: 'almacen',
    numeric: false,
    disablePadding: true,
    label: 'Almacen',
  },
  {
    id: 'lote',
    numeric: false,
    disablePadding: true,
    label: 'Lote',
  },
  {
    id: 'activo',
    numeric: false,
    disablePadding: true,
    label: 'Activo',
  },
];

function CenterTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSortOrderChange(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Acciones</TableCell>
      </TableRow>
    </TableHead>
  );
}

CenterTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(CenterTableHead);
