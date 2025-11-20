import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';
import TableRow from '@material-ui/core/TableRow';
import { Edit, MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getCenterActions = () => {
  const actions = [{ action: 'edit', label: 'Editar', icon: <Edit /> }];
  return actions;
};

const CenterListRow = ({ row, onRowClick, onEdit, onDelete }) => {
  const classes = useStyles();
  const oneMenuClick = menu => {
    if (menu.action === 'edit') {
      onEdit(row);
    } 
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
 
  const actions = getCenterActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.id)}
      role="checkbox"
      tabIndex={-1}
      key={row.id}>
      <TableCell align="center">
        <Typography id={labelId} className={classes.titleRoot} component="div" variant="h4">
          {row.id}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.titleRoot} component="div" variant="h4">
          {row.nombre}
        </Typography>
      </TableCell>
      <TableCell align="center">{row.centro}</TableCell>
      <TableCell align="center">{row.almacen}</TableCell>
      <TableCell align="center">{row.lote}</TableCell>
      <TableCell align="center">{row.activo? <Chip label='Si' color="primary" /> : <Chip label='No' />}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={actions} onItemClick={oneMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(CenterListRow);
