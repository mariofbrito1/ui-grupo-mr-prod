import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip'; // ✅ Chip viene de core
import { Edit, MoreHoriz } from '@material-ui/icons'; // ✅ Solo iconos aquí
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import DeleteIcon from '@material-ui/icons/Delete'; 

const getUserActions = () => { 
  const actions = [
    { action: 'edit', label: 'Editar', icon: <Edit /> },
    { action: 'delete', label: 'Eliminar', icon: <DeleteIcon /> },
  ];
  return actions;
};

const UserListRow = ({ usuario, onUserDelete, row }) => {
  const history = useHistory();
  const onUserMenuClick = menu => {
    if (menu.action === 'edit') {
      history.push(`/user/users/${usuario.id}`);
    } else if (menu.action === 'delete') {
      onUserDelete(usuario);
    }
  };

  const userActions = getUserActions();

  return (
    <TableRow hover key={usuario.id}>
      <TableCell align="center">
        <b>100-0{usuario.id}</b>
      </TableCell>
      <TableCell align="center" padding="normal">
        {`${usuario.nombre} ${usuario.apellido}`}
      </TableCell>
      <TableCell align="center">{usuario.email}</TableCell>
      <TableCell align="center">{usuario.email_notificacion}</TableCell> 
      
      <TableCell align="center">{usuario.telefono}</TableCell>
      <TableCell align="center">{usuario.rol}</TableCell>
      <TableCell align="center">
        <Chip 
          key={usuario.id} 
          label={usuario.activo ? 'Sí' : 'No'} 
          color={usuario.activo ? "primary" : "default"} // Opcional: dar color
          size="small" // Opcional: tamaño
        />
      </TableCell>
      <TableCell align="center">{moment(usuario.fecha_creado).format('DD-MM-YYYY')}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={userActions} onItemClick={onUserMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);