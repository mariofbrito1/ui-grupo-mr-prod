import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { Box } from '@material-ui/core';
import CmtAvatar from '../../../../@coremat/CmtAvatar';

import Chip from '@material-ui/core/Chip';
import useStyles from './index.style';

const ProductListModule = ({ row, isSelected, onRowClick }) => {
  const classes = useStyles();

  const labelId = `enhanced-table-checkbox-${row.id}`;
  //const isItemSelected = isSelected(row.id);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.id)}
      role="checkbox"
      aria-checked={false}
      style={row.deleted_at && { backgroundColor: '#f2f2f2' }}
      tabIndex={-1}
      key={row.id}>
      <TableCell padding="checkbox">
        <Checkbox checked={false} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell align="center" style={{ color: '#0bbbf3' }} component="th" id={labelId} scope="row" padding="none">
        <Box className={classes.imageContainer}>
          <CmtAvatar size={70} src={row.imagen} alt={row.title} />
        </Box>
      </TableCell>
      <TableCell align="center">{row.nombre}</TableCell>
      <TableCell align="center">
        <Chip color="primary" label={<h2>{'$ ' + row.precio}</h2>} />
      </TableCell>
      <TableCell align="center">{row.cantidad_maxima}</TableCell>
      <TableCell align="center">{row.activo ? 'Si' : 'No'}</TableCell>
      <TableCell align="center">{row.sku}</TableCell>
    </TableRow>
  );
};

export default React.memo(ProductListModule);
