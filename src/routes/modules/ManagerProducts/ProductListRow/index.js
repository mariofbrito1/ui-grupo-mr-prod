import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, MoreHoriz } from '@material-ui/icons';
import { Box,
        Card, 
        Dialog, 
        DialogActions, 
        DialogTitle, 
        DialogContent, 
        Button,
        Table,
        TableBody,
        TableContainer,
        MenuItem,
      } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import CmtAvatar from '../../../../@coremat/CmtAvatarMat';
import Chip from '@material-ui/core/Chip';
import useStyles from './index.style';
import { useDispatch, useSelector } from 'react-redux';
import { getCentersByIdProduct } from '../../../../redux/actions/ProductosCentros';

import ContentEditable from 'react-contenteditable';

const getProductActions = product => {
  const actions = [{ action: 'edit', label: 'Editar', icon: <Edit /> }];
  return actions;
};

const ProductListRow = ({ row,  onProductEdit, addValueUM  }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onProductMenuClick = menu => {
    if (menu.action === 'edit') {
      //console.log('Edit');
      onProductEdit(row);
    } 
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const productActions = getProductActions(row);
  const image='/images/auth/login-img.png';
  const [open, setOpen] = useState(false);

  const { centers = [] } = useSelector(state => state.ProductosCentros);

  const handleClose = (data) =>{
    setOpen(false);
  }

  const actionHandler = (data) =>{
    console.log("data action handler", data);
    dispatch(getCentersByIdProduct(data));
    setOpen(true);
  }

  const handleBlur = (event, row) => {
    let value = {
      unidad_medida: event.target.innerHTML,
      id: row.id 
    };
    addValueUM(value);
  };
  

  const actions = [
    {
      label: 'Centros Asociados',
    },
  ];

  console.log("lrow.imagen", row.imagen);
  


  return (
    <>
    <TableRow
      hover
      style={(!row.activo)? { backgroundColor: '#e2e2e2' } : { backgroundColor: '#ffffff' }}
      tabIndex={-1}
      key={row.id}>
      <TableCell padding="checkbox">
      </TableCell>
      <TableCell align="center" style={{ color: '#0bbbf3' }} component="th" id={labelId} scope="row" padding="none">
        <Box className={classes.imageContainer}>
          <CmtAvatar size={65} src={!row.imagen?image:row.imagen} alt={row.title} />
        </Box>
      </TableCell>
      <TableCell align="center">{(row.opcional && row.opcional != null && (row.opcional).length>0)?row.opcional:row.descripcion}</TableCell>
      <TableCell align="center">{row.kilogramos}</TableCell>
      <TableCell align="center">
        <Chip color="primary" label={<h2>{'$ ' + ((parseFloat(row.kilogramos) > 0)?(row.kilogramos*row.precio).toFixed(2):row.precio)}</h2>} />
      </TableCell>
      <TableCell align="center">
        <Chip color="primary" label={<h2>{'$ ' + ((parseFloat(row.kilogramos) > 0)?((parseFloat(row.precio*row.iva)+parseFloat(row.precio))*row.kilogramos).toFixed(2):(parseFloat(row.precio*row.iva)+parseFloat(row.precio)).toFixed(2))}</h2>} />
      </TableCell>
      <TableCell align="center">{row.activo ? 'Si' : 'No'}</TableCell>
      <TableCell align="center">{row.tipo_sku}</TableCell>
      <TableCell align="center">{parseInt(row.sku)}</TableCell>
      <TableCell align="center">  
        <MenuItem>
          <ContentEditable html={row.unidad_medida} onBlur={(x)=>handleBlur(x, row)} />
        </MenuItem>
      </TableCell>
      <TableCell align="center"> <Chip color="secondary" label={(row.iva*100)+' %'}/></TableCell>
      <TableCell align="center"> <CmtDropdownMenu
              TriggerComponent={
                <Tooltip title="Ver Centros Asociados">
                  <IconButton style={{ marginLeft: 4 }}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              }
              items={actions}
              onItemClick={()=>actionHandler(row.id)}
            />
    </TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={productActions} onItemClick={onProductMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Centros Asociados</DialogTitle>
          <DialogContent>
            <TableContainer>
              <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
                <TableBody>
                  {!!centers.length ? (               
                    centers.map((row, index) => (
                        <TableCell>
                          <Card>
                            <h4 style={{ padding: '5px', margin: '5px'}}>{row.nombre}</h4>
                          </Card>
                        </TableCell>
                      ))
                  ) : (
                    <TableRow >
                      <TableCell>
                        <Card>
                          <h2 style={{ padding: '5px', margin: '5px'}}>
                            Sin Centros Asociados
                          </h2>
                          <IconButton style={{ margin: 4 }} onClick={()=>onProductEdit(row)}>
                            <AddIcon /><small>Asociar Centros</small>
                          </IconButton>
                        </Card>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
           
          </DialogActions>
      </Dialog>
    
    </>
  );
};

export default React.memo(ProductListRow);
