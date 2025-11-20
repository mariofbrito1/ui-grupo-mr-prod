import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchError, fetchStart, fetchSuccess } from 'redux/actions';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Button, Chip, OutlinedInput, FormHelperText, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormChangePassword from '../ChangePassword'; 
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Header from './Header';
import { initUsuariosForm, postUsuario, updateUsuario } from 'redux/actions/Usuarios';

// Iconos para mejor UX
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  sectionTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    color: '#2c3e50',
    fontWeight: 600,
    fontSize: '1.1rem',
    borderBottom: `2px solid ${theme.palette.grey[300]}`,
    paddingBottom: theme.spacing(1),
  },
  formContainer: {
    padding: theme.spacing(2),
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    minHeight: '32px',
    alignItems: 'center',
  },
  chip: {
    margin: theme.spacing(0.25),
    backgroundColor: theme.palette.secondary.main, // Cambiado a secondary
    color: theme.palette.secondary.contrastText, // Cambiado a secondary
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark, // Cambiado a secondary
    },
  },
  chipDelete: {
    color: theme.palette.secondary.contrastText, // Cambiado a secondary
  },
  selectRoot: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  formControl: {
    marginBottom: theme.spacing(2),
    '& .MuiInputLabel-root': {
      fontSize: '0.9rem',
      color: '#34495e',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
    '& .MuiInputLabel-root': {
      color: '#34495e',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  buttonGroup: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  activeStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  activeIcon: {
    color: theme.palette.success.main,
    fontSize: '1.2rem',
  },
  inactiveIcon: {
    color: theme.palette.error.main,
    fontSize: '1.2rem',
  },
  counterBadge: {
    backgroundColor: theme.palette.secondary.main, // Cambiado a secondary
    color: 'white',
    borderRadius: '50%',
    width: 20,
    height: 20,
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(1),
  },
  helperText: {
    marginTop: theme.spacing(1),
    fontSize: '0.75rem',
    color: '#7f8c8d',
  },
  requiredAsterisk: {
    color: theme.palette.error.main,
  },
  cardHeader: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: theme.spacing(2, 3),
    '& .Cmt-card-header-title': {
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  },
  cardHeaderNew: {
    backgroundColor: theme.palette.primary.main, // Color primary para Nuevo Usuario
    color: 'white',
    padding: theme.spacing(2, 3),
    '& .Cmt-card-header-title': {
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  },
  divider: {
    backgroundColor: '#bdc3c7',
    margin: theme.spacing(2, 0),
  },
  labelText: {
    color: '#2c3e50',
    fontWeight: 500,
  },
  inputLabel: {
    color: '#34495e',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  menuItemSelected: {
    backgroundColor: `${theme.palette.secondary.light} !important`, // Cambiado a secondary
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: `${theme.palette.secondary.main} !important`, // Cambiado a secondary
    },
  },
  checkIcon: {
    marginRight: 8,
    fontSize: '1rem',
    color: theme.palette.secondary.main, // Cambiado a secondary
  },
}));

// Configuración para el Select múltiple
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  variant: 'menu',
};

function getStyles(item, selectedItems, theme) {
  return {
    fontWeight: selectedItems.includes(item.id)
      ? theme.typography.fontWeightBold
      : theme.typography.fontWeightRegular,
    backgroundColor: selectedItems.includes(item.id)
      ? theme.palette.secondary.light // Cambiado a secondary
      : 'transparent',
    color: selectedItems.includes(item.id)
      ? theme.palette.secondary.contrastText // Cambiado a secondary
      : 'inherit',
    '&:hover': {
      backgroundColor: selectedItems.includes(item.id)
        ? theme.palette.secondary.main // Cambiado a secondary
        : theme.palette.action.hover,
    },
  };
}

const AddEditUser = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { id } = useParams();

  const { usuarioAEditar = null } = useSelector(state => state.usuarios);

  //COMBOS
  const { listaSucursales = [] } = useSelector(state => state.sucursales);
  const { listaRoles = [] } = useSelector(state => state.roles);
  const { listaCategorias = [] } = useSelector(state => state.categorias);
  const { listaSectores = [] } = useSelector(state => state.sectores);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsuariosForm({ id }));
  }, [dispatch, id]);

  const [user, setUser] = useState({
    nombre: '',
    apellido: '', 
    usuario: '',
    email: '',
    password: '',
    id_rol: '',  
    activo: true,
    id_categoria: [],
    id_sector: [],
    dni: '',
    fecha_nacimiento: '',
    fecha_ingreso: '',
    telefono: '',
  });

  const [resetPasswordSent, setResetPasswordSent] = useState(false);

  useEffect(() => {
    if (usuarioAEditar) {
      const {
        nombre,
        apellido, 
        usuario,
        email,
        id_rol, 
        restaurar,
        activo,
        id_categoria,
        id_sector,
        dni,
        fecha_nacimiento,
        fecha_ingreso,
        telefono,
      } = usuarioAEditar;
      
      const categoriasArray = Array.isArray(id_categoria) 
        ? id_categoria 
        : id_categoria ? [id_categoria] : [];
      
      const sectoresArray = Array.isArray(id_sector) 
        ? id_sector 
        : id_sector ? [id_sector] : [];

      setUser(prevState => ({
        ...prevState,
        nombre,
        apellido, 
        usuario,
        email,
        id_rol, 
        activo,
        id_categoria: categoriasArray,
        id_sector: sectoresArray,
        dni: dni || '',
        fecha_nacimiento: fecha_nacimiento || '',
        fecha_ingreso: fecha_ingreso || '',
        telefono: telefono || '',
      }));
      
      if (restaurar !== null) {
        setResetPasswordSent(true);
      }
    }
  }, [usuarioAEditar]);

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleMultipleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // Función para eliminar un item específico de los arrays múltiples
  const handleDeleteChip = (name, valueToDelete) => {
    setUser({
      ...user,
      [name]: user[name].filter(item => item !== valueToDelete),
    });
  };

  const onSuccess = () => history.push('/user/users');

  const onSaveUser = e => {
    e.preventDefault();
    console.log('on save user', user);
    
    const userToSend = {
      ...user,
      id_categoria: Array.isArray(user.id_categoria) ? user.id_categoria : [],
      id_sector: Array.isArray(user.id_sector) ? user.id_sector : [],
    };
    
    dispatch(postUsuario(userToSend, onSuccess));
  };

  const onUpdateUser = e => {
    e.preventDefault();
    const { nombre, apellido, id_rol, email, activo, id_categoria, id_sector } = user;
    
    const userToUpdate = {
      nombre,
      apellido, 
      id_rol, 
      email,
      activo,
      id_categoria: Array.isArray(id_categoria) ? id_categoria : [],
      id_sector: Array.isArray(id_sector) ? id_sector : [],
    };
    
    dispatch(updateUsuario(id, userToUpdate, onSuccess));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Contadores para los items seleccionados
  const categoriasCount = user.id_categoria.length;
  const sectoresCount = user.id_sector.length;

  // Determinar la clase del header según si es nuevo o edición
  const headerClass = id === 'add' ? classes.cardHeaderNew : classes.cardHeader;

  const perfilDetail = {
    name: 'Usuarios',
    location: '/user/users/add',
    profile_pic: '/images/auth/profile.png',
  };

  return (
    <React.Fragment>
      <Box className={classes.pageFull}>
        <Header perfilDetail={perfilDetail} />
        <GridContainer>
          <Grid item xs={12} lg={12} className={classes.profileSidebar}>
            <Box mb={4}>
              <CmtCard>
                 
                <CmtCardContent className={classes.formContainer}>
                  <form
                    id="form-user"
                    onSubmit={e => {
                      id !== 'add' ? onUpdateUser(e) : onSaveUser(e);
                    }}>
                     
                    <Grid container spacing={3}>
                      {/* Sección Datos Personales */}
                      <Grid item xs={12}>
                        <Typography className={classes.sectionTitle}>
                          Datos Personales
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="nombre"
                          label="Nombre"
                          required
                          fullWidth
                          variant="outlined"
                          className={classes.textField}
                          value={user.nombre}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="apellido"
                          label="Apellido"
                          required
                          fullWidth
                          variant="outlined"
                          className={classes.textField}
                          value={user.apellido}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="dni"
                          label="D.N.I."
                          required
                          fullWidth
                          variant="outlined"
                          className={classes.textField}
                          value={user.dni}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="fecha_nacimiento"
                          label="Fecha de Nacimiento"
                          type="date"
                          required
                          fullWidth
                          variant="outlined"
                          className={classes.textField}
                          value={user.fecha_nacimiento}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="fecha_ingreso"
                          label="Fecha de Ingreso"
                          type="date"
                          required
                          fullWidth
                          variant="outlined"
                          className={classes.textField}
                          value={user.fecha_ingreso}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="telefono"
                          label="Teléfono/Celular"
                          required
                          fullWidth
                          variant="outlined"
                          className={classes.textField}
                          value={user.telefono}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel,
                          }}
                        />
                      </Grid>

                      {/* Selectores Múltiples */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                          <InputLabel 
                            id="categoria-dropdown"
                            className={classes.inputLabel}
                          >
                            Categorías {categoriasCount > 0 && <span className={classes.counterBadge}>{categoriasCount}</span>}
                          </InputLabel>
                          <Select
                            name="id_categoria"
                            labelId="categoria-dropdown"
                            multiple
                            required
                            value={user.id_categoria}
                            onChange={handleMultipleChange}
                            input={<OutlinedInput label={`Categorías ${categoriasCount > 0 ? `(${categoriasCount})` : ''}`} />}
                            renderValue={(selected) => (
                              <div className={classes.chipsContainer}>
                                {selected.length === 0 ? (
                                  <Typography variant="body2" color="textSecondary">
                                    Seleccione categorías...
                                  </Typography>
                                ) : (
                                  selected.map((value) => {
                                    const categoria = listaCategorias.find(cat => cat.id === value);
                                    return (
                                      <Chip 
                                        key={value} 
                                        label={categoria ? categoria.descripcion : value} 
                                        className={classes.chip}
                                        onDelete={() => handleDeleteChip('id_categoria', value)}
                                        deleteIcon={<span className={classes.chipDelete}>×</span>}
                                        size="small"
                                      />
                                    );
                                  })
                                )}
                              </div>
                            )}
                            MenuProps={MenuProps}>
                            {listaCategorias.map((categoria) => (
                              <MenuItem
                                key={categoria.id}
                                value={categoria.id}
                                style={getStyles(categoria, user.id_categoria, theme)}
                                className={user.id_categoria.includes(categoria.id) ? classes.menuItemSelected : ''}
                              >
                                <CheckCircleIcon 
                                  className={classes.checkIcon}
                                  style={{ 
                                    visibility: user.id_categoria.includes(categoria.id) ? 'visible' : 'hidden',
                                  }} 
                                />
                                {categoria.descripcion}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText className={classes.helperText}>
                            Puede seleccionar múltiples categorías
                          </FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                          <InputLabel 
                            id="sector-dropdown"
                            className={classes.inputLabel}
                          >
                            Sectores {sectoresCount > 0 && <span className={classes.counterBadge}>{sectoresCount}</span>}
                          </InputLabel>
                          <Select
                            name="id_sector"
                            labelId="sector-dropdown"
                            multiple
                            required
                            value={user.id_sector}
                            onChange={handleMultipleChange}
                            input={<OutlinedInput label={`Sectores ${sectoresCount > 0 ? `(${sectoresCount})` : ''}`} />}
                            renderValue={(selected) => (
                              <div className={classes.chipsContainer}>
                                {selected.length === 0 ? (
                                  <Typography variant="body2" color="textSecondary">
                                    Seleccione sectores...
                                  </Typography>
                                ) : (
                                  selected.map((value) => {
                                    const sector = listaSectores.find(sec => sec.id === value);
                                    return (
                                      <Chip 
                                        key={value} 
                                        label={sector ? sector.descripcion : value} 
                                        className={classes.chip}
                                        onDelete={() => handleDeleteChip('id_sector', value)}
                                        deleteIcon={<span className={classes.chipDelete}>×</span>}
                                        size="small"
                                      />
                                    );
                                  })
                                )}
                              </div>
                            )}
                            MenuProps={MenuProps}>
                            {listaSectores.map((sector) => (
                              <MenuItem
                                key={sector.id}
                                value={sector.id}
                                style={getStyles(sector, user.id_sector, theme)}
                                className={user.id_sector.includes(sector.id) ? classes.menuItemSelected : ''}
                              >
                                <CheckCircleIcon 
                                  className={classes.checkIcon}
                                  style={{ 
                                    visibility: user.id_sector.includes(sector.id) ? 'visible' : 'hidden',
                                  }} 
                                />
                                {sector.descripcion}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText className={classes.helperText}>
                            Puede seleccionar múltiples sectores
                          </FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                          <InputLabel 
                            id="roles-dropdown"
                            className={classes.inputLabel}
                          >
                            Rol de Sistema
                          </InputLabel>
                          <Select
                            name="id_rol"
                            labelId="roles-dropdown"
                            required
                            value={user.id_rol}
                            onChange={handleChange}
                            label="Rol">
                            {listaRoles.map(rol => (
                              <MenuItem key={rol.id} value={rol.id}>
                                {rol.nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Sección Datos de Acceso */}
                      <Grid item xs={12}>
                        <Divider className={classes.divider} />
                        <Typography className={classes.sectionTitle}>
                          Datos de Acceso
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="usuario"
                          label="Usuario"
                          required
                          fullWidth
                          variant="outlined"
                          className={classes.textField}
                          onChange={handleChange}
                          value={user.usuario || user.email}
                          disabled={id !== 'add'}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="email"
                          label="Email de Notificación"
                          type="email"
                          required
                          fullWidth
                          variant="outlined"
                          className={classes.textField}
                          onChange={handleChange}
                          value={user.email}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabel,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                          <InputLabel 
                            id="active-select-label"
                            className={classes.inputLabel}
                          >
                            Estado
                          </InputLabel>
                          <Select 
                            name="activo" 
                            label="Estado" 
                            value={user.activo} 
                            onChange={handleChange}
                          >
                            <MenuItem value={true}>
                              <Box className={classes.activeStatus}>
                                <CheckCircleIcon className={classes.activeIcon} />
                                <Typography className={classes.labelText}>Activo</Typography>
                              </Box>
                            </MenuItem>
                            <MenuItem value={false}>
                              <Box className={classes.activeStatus}>
                                <CancelIcon className={classes.inactiveIcon} />
                                <Typography className={classes.labelText}>Inactivo</Typography>
                              </Box>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {id !== 'add' ? (
                        <Grid item xs={12} sm={6} md={4}>
                          <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            size="large"
                            fullWidth
                            style={{ height: '56px', borderRadius: 8 }}
                            onClick={handleClickOpen}
                            startIcon={<span>🔑</span>}>
                            Restaurar Contraseña
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            name="password"
                            label="Contraseña"
                            type="password"
                            required
                            fullWidth
                            variant="outlined"
                            className={classes.textField}
                            onChange={handleChange}
                            value={user.password}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      )}

                          {/* Sección Datos Adicionales */}

                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                        <Typography className={classes.sectionTitle}>
                          Documentación Carnet 
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                          <InputLabel 
                            id="roles-dropdown"
                            className={classes.inputLabel}
                          >
                            Carnet
                          </InputLabel>
                          <Select
                            name="id_rol"
                            labelId="roles-dropdown"
                            required
                            value={user.id_rol}
                            onChange={handleChange}
                            label="Rol">
                            {listaRoles.map(rol => (
                              <MenuItem key={rol.id} value={rol.id}>
                                {rol.nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                            <TextField
                              name="fecha_vencimiento_carnet"
                              label="Fecha Vencimiento" 
                              required
                              fullWidth
                              variant="outlined"
                              className={classes.textField}
                              onChange={handleChange}
                              value={user.fecha_vencimiento_carnet}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={4}>
                            <TextField
                              name="img_carnet"
                              label="Captura de Carnet de Conducir" 
                              required
                              fullWidth
                              variant="outlined"
                              className={classes.textField}
                              onChange={handleChange}
                              value={user.img_carnet}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                      </Grid>



                      <Grid item xs={12}>
                        <Divider className={classes.divider} />
                        <Typography className={classes.sectionTitle}>
                          Datos Adicionales - Asignaciones -
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                          <InputLabel 
                            id="roles-dropdown"
                            className={classes.inputLabel}
                          >
                            Turno
                          </InputLabel>
                          <Select
                            name="id_rol"
                            labelId="roles-dropdown"
                            required
                            value={user.id_rol}
                            onChange={handleChange}
                            label="Rol">
                            {listaRoles.map(rol => (
                              <MenuItem key={rol.id} value={rol.id}>
                                {rol.nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>


                       <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                          <InputLabel 
                            id="roles-dropdown"
                            className={classes.inputLabel}
                          >
                            Unidad/Vehiculos
                          </InputLabel>
                          <Select
                            name="id_rol"
                            labelId="roles-dropdown"
                            required
                            value={user.id_rol}
                            onChange={handleChange}
                            label="Rol">
                            {listaRoles.map(rol => (
                              <MenuItem key={rol.id} value={rol.id}>
                                {rol.nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Botones de Acción */}
                      <Grid item xs={12}>
                        <Box className={classes.buttonGroup}>
                          <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item>
                              <Button
                                type="button"
                                variant="outlined"
                                color="secondary"
                                size="large"
                                onClick={() => history.push('/user/users')}
                                style={{ borderRadius: 8, minWidth: 120 }}>
                                Cancelar
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                size="large"
                                style={{ borderRadius: 8, minWidth: 120 }}>
                                {id !== 'add' ? 'Actualizar' : 'Crear'} Usuario
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </CmtCardContent>
              </CmtCard>
            </Box>
          </Grid>
        </GridContainer>
      </Box>
      {open && <FormChangePassword open={open} setOpen={setOpen} />}
    </React.Fragment>
  );
};

export default AddEditUser;