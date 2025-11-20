import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { 
  Button, 
  Chip, 
  OutlinedInput, 
  FormHelperText, 
  Typography, 
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Collapse,
  IconButton,
  Card,
  CardContent,
  Tooltip,
  Paper
} from '@material-ui/core';
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
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

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
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  chipDelete: {
    color: theme.palette.secondary.contrastText,
  },
  formControl: {
    marginBottom: theme.spacing(3),
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
    marginBottom: theme.spacing(3),
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
    backgroundColor: theme.palette.secondary.main,
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
    backgroundColor: theme.palette.primary.main,
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
    margin: theme.spacing(3, 0),
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
    backgroundColor: `${theme.palette.secondary.light} !important`,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: `${theme.palette.secondary.main} !important`,
    },
  },
  checkIcon: {
    marginRight: 8,
    fontSize: '1rem',
    color: theme.palette.secondary.main,
  },
  dniContainer: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'flex-start',
    marginBottom: theme.spacing(3),
  },
  dniField: {
    flex: 1,
  },
  radioField: {
    flex: 1,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 8,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    minHeight: '56px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: theme.spacing(1),
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  radioLabel: {
    fontSize: '0.8rem',
    color: '#34495e',
    fontWeight: 500,
    marginBottom: theme.spacing(1),
    textAlign: 'center',
  },
  formControlLabel: {
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(0.5),
    '& .MuiFormControlLabel-label': {
      fontSize: '0.75rem',
    },
  },
  conditionalSection: {
    transition: 'all 0.3s ease-in-out',
    width: '100%',
  },
  infoText: {
    fontStyle: 'italic',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(1),
    border: `1px dashed ${theme.palette.grey[300]}`,
    marginBottom: theme.spacing(2),
  },
  conditionalGridContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  conditionalGridItem: {
    padding: theme.spacing(1),
  },
  carnetCard: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 8,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  carnetHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  carnetTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  addCarnetButton: {
    marginBottom: theme.spacing(2),
  },
  deleteCarnetButton: {
    color: theme.palette.error.main,
  },
  fullWidthContainer: {
    width: '100%',
  },
  fullWidthGrid: {
    width: '100%',
    margin: 0,
  },
  sectionContainer: {
    width: '100%',
  },
  infoIcon: {
    fontSize: '1rem',
    color: theme.palette.info.main,
    marginLeft: theme.spacing(0.5),
  },
  infoPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.info.light,
    border: `1px solid ${theme.palette.info.main}`,
    borderRadius: 8,
  },
  infoTitle: {
    fontWeight: 600,
    color: theme.palette.info.dark,
    marginBottom: theme.spacing(1),
  },
  infoList: {
    paddingLeft: theme.spacing(2),
  },
  infoItem: {
    marginBottom: theme.spacing(0.5),
    fontSize: '0.9rem',
  },
  selectLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  validationContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  successPaper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.success.light,
    border: `2px solid ${theme.palette.success.main}`,
    borderRadius: 8,
  },
  warningPaper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.warning.light,
    border: `2px solid ${theme.palette.warning.main}`,
    borderRadius: 8,
  },
  validationTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  successTitle: {
    color: theme.palette.success.dark,
  },
  warningTitle: {
    color: theme.palette.warning.dark,
  },
  validationList: {
    paddingLeft: theme.spacing(2),
  },
  validationItem: {
    marginBottom: theme.spacing(0.5),
    fontSize: '0.9rem',
  },
  successItem: {
    color: theme.palette.success.dark,
  },
  warningItem: {
    color: theme.palette.warning.dark,
  },
}));

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
      ? theme.palette.secondary.light
      : 'transparent',
    color: selectedItems.includes(item.id)
      ? theme.palette.secondary.contrastText
      : 'inherit',
    '&:hover': {
      backgroundColor: selectedItems.includes(item.id)
        ? theme.palette.secondary.main
        : theme.palette.action.hover,
    },
  };
}

const TIPOS_DNI = [
  { id: 1, descripcion: 'DNI' },
  { id: 2, descripcion: 'LLC' },
  { id: 3, descripcion: 'LE' },
  { id: 4, descripcion: 'OTROS' }
];

// CORREGIDO según tu tabla
const INFO_TIPOS_CARNET = {
  1: {
    descripcion: 'Municipal',
    usos: [
      'Chofer de fábrica',
      'Chofer de servicio urbano',
      'Servicios locales'
    ]
  },
  2: {
    descripcion: 'Transporte',
    usos: [
      'Chofer de interurbano',
      'Transporte de pasajeros entre ciudades'
    ]
  },
  3: {
    descripcion: 'Turismo',
    usos: [
      'Servicios turísticos',
      'Transporte de turistas'
    ]
  },
  4: {
    descripcion: 'Nacional',
    usos: [
      'Transporte interprovincial',
      'Servicios de larga distancia'
    ]
  }
};

const AddEditUser = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { id } = useParams();

  const { usuarioAEditar = null } = useSelector(state => state.usuarios); 
  
  const { listaRoles = [] } = useSelector(state => state.roles);
  const { listaCategorias = [] } = useSelector(state => state.categorias);
  const { listaSectores = [] } = useSelector(state => state.sectores);
  const { listaTiposCarnet = [] } = useSelector(state => state.tiposCarnet || {});
  const { listaTurnos = [] } = useSelector(state => state.turnos || {});
  const { listaVehiculos = [] } = useSelector(state => state.vehiculos || {});
  const { listaSucursales = [] } = useSelector(state => state.sucursales || {}); 
  const { listaNacionalidades = [] } = useSelector(state => state.nacionalidades || {}); 

  const [open, setOpen] = useState(false);
  const [resetPasswordSent, setResetPasswordSent] = useState(false);

  const dispatch = useDispatch();

  const initialCarnetState = {
    id_tipo_carnet: '',
    fecha_vencimiento_carnet: '',
    img_carnet: ''
  };

  const [user, setUser] = useState({
    nombre: '',
    apellido: '', 
    usuario: '', 
    email: '',
    password: '',
    id_rol: '',  
    activo: true,
    sucursales: [],
    categorias: [],
    sectores: [],
    id_nacionalidad: '',
    dni: '',
    id_tipo_dni: 1,
    fecha_nacimiento: '',
    fecha_vencimiento_dni: "",
    fecha_ingreso: '',
    telefono: '',
    carnets: [initialCarnetState],
    id_turno: '',
    vehiculos: [],
  });

  const esConductor = useMemo(() => {
    if (!user.categorias || user.categorias.length === 0) return false;
    
    const categoriasSeleccionadas = listaCategorias.filter(cat => 
      user.categorias.includes(cat.id)
    );
    
    return categoriasSeleccionadas.some(cat => 
      cat.descripcion.toLowerCase().includes('conductor')
    );
  }, [user.categorias, listaCategorias]);


  const CARNET_MUNICIPAL = 1; 
  const CARNET_TRANSPORTE = 2;
  const CARNET_TURISMO = 3;

  const deteccionAutomaticaConductor = useMemo(() => {
    if (!esConductor) {
      return { tipo: null, mensaje: null };
    }

    const carnetsSeleccionados = user.carnets
      .filter(carnet => carnet.id_tipo_carnet)
      .map(carnet => parseInt(carnet.id_tipo_carnet));

    // Verificar combinaciones de carnets
    const tieneMunicipal = carnetsSeleccionados.includes(CARNET_MUNICIPAL);
    const tieneTransporte = carnetsSeleccionados.includes(CARNET_TRANSPORTE);
    const tieneTurismo = carnetsSeleccionados.includes(CARNET_TURISMO); 

    // Detección automática basada en los carnets seleccionados
    if (tieneMunicipal && tieneTransporte && tieneTurismo) {
      return { 
        tipo: 'Chofer *', 
        mensaje: '✅ Chofer con todos los Carnets Disponibles',
        cumplido: true
      };
    } else if (tieneMunicipal && tieneTurismo) {
      return { 
        tipo: 'Chofer Turismo', 
        mensaje: '✅ Chofer Turismo (Carnet Municipal + Turismo)',
        cumplido: true
      };
    } else if (tieneMunicipal && tieneTransporte) {
      return { 
        tipo: 'Chofer Interurbano', 
        mensaje: '✅ Chofer Interurbano (Carnet Municipal + Transporte)',
        cumplido: true
      };
    } else if (tieneMunicipal) {
      // Si solo tiene municipal, podría ser fábrica o servicio urbano
      const categoriasSeleccionadas = listaCategorias.filter(cat => 
        user.categorias.includes(cat.id)
      );
      
      const esFabrica = categoriasSeleccionadas.some(cat => 
        cat.descripcion.toLowerCase().includes('fabrica')
      );
      const esUrbano = categoriasSeleccionadas.some(cat => 
        cat.descripcion.toLowerCase().includes('urbano')
      );

      if (esFabrica) {
        return { 
          tipo: 'Chofer Fábrica', 
          mensaje: '✅ Se detectó: Chofer Fábrica (Carnet Municipal)',
          cumplido: true
        };
      } else if (esUrbano) {
        return { 
          tipo: 'Chofer Servicio Urbano', 
          mensaje: '✅ Se detectó: Chofer Servicio Urbano (Carnet Municipal)',
          cumplido: true
        };
      } else {
        return { 
          tipo: 'Conductor Municipal', 
          mensaje: '✅ Se detectó: Chofer Fábrica o Urbano',
          cumplido: true
        };
      }
    }  

    return { tipo: null, mensaje: null };
  }, [user.carnets, user.categorias, listaCategorias, esConductor]);

  // CORREGIDO - Validación de carnets requeridos según categorías seleccionadas
  const validacionCarnets = useMemo(() => {
    if (!esConductor || !user.categorias || user.categorias.length === 0) {
      return { tieneValidaciones: false, mensajes: [] };
    }

    const categoriasSeleccionadas = listaCategorias.filter(cat => 
      user.categorias.includes(cat.id)
    );

    const carnetsSeleccionados = user.carnets
      .filter(carnet => carnet.id_tipo_carnet)
      .map(carnet => parseInt(carnet.id_tipo_carnet));

    const mensajes = [];
    const mensajesCumplidos = [];

    // Verificar cada categoría seleccionada
    categoriasSeleccionadas.forEach(categoria => {
      const descripcion = categoria.descripcion.toLowerCase();
      
      // Chofer Turismo = Municipal (1) Y Turismo (3)
      if (descripcion.includes('turismo')) {
        const tieneMunicipal = carnetsSeleccionados.includes(1);
        const tieneTurismo = carnetsSeleccionados.includes(3);
        
        if (tieneMunicipal && tieneTurismo) {
          mensajesCumplidos.push(`✅ Chofer Turismo: Tiene Carnet Municipal Y Turismo`);
        } else {
          mensajes.push(`❌ Chofer Turismo: Requiere Carnet Municipal Y Turismo  `);
        }
      }
      
      // Chofer Fábrica = Municipal (1)
      if (descripcion.includes('fabrica')) {
        const tieneMunicipal = carnetsSeleccionados.includes(1);
        
        if (tieneMunicipal) {
          mensajesCumplidos.push(`✅ Chofer Fábrica: Tiene Carnet Municipal`);
        } else {
          mensajes.push(`❌ Chofer Fábrica: Requiere Carnet Municipal  `);
        }
      }
      
      // Chofer Servicio Urbano = Municipal (1)
      if (descripcion.includes('urbano')) {
        const tieneMunicipal = carnetsSeleccionados.includes(1);
        
        if (tieneMunicipal) {
          mensajesCumplidos.push(`✅ Chofer Servicio Urbano: Tiene Carnet Municipal`);
        } else {
          mensajes.push(`❌ Chofer Servicio Urbano: Requiere Carnet Municipal`);
        }
      }
      
      // Chofer Interurbano = Transporte (2) Y Municipal (1)
      if (descripcion.includes('interurbano')) {
        const tieneTransporte = carnetsSeleccionados.includes(2);
        const tieneMunicipal = carnetsSeleccionados.includes(1);
        
        if (tieneTransporte && tieneMunicipal) {
          mensajesCumplidos.push(`✅ Chofer Interurbano: Tiene Carnet Transporte Y Municipal`);
        } else {
          mensajes.push(`❌ Chofer Interurbano: Requiere Carnet Transporte Y Municipal`);
        }
      }
    });

    return {
      tieneValidaciones: mensajes.length > 0,
      tieneCumplidos: mensajesCumplidos.length > 0,
      mensajes: [...new Set(mensajes)],
      mensajesCumplidos: [...new Set(mensajesCumplidos)]
    };
  }, [user.categorias, user.carnets, listaCategorias, esConductor]);

  useEffect(() => {
    dispatch(initUsuariosForm({ id }));
  }, [dispatch, id]);

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
        sucursales,
        categorias,
        sectores,
        dni,
        id_tipo_dni,
        fecha_nacimiento,
        fecha_vencimiento_dni,
        fecha_ingreso,
        telefono,
        carnets,
        id_turno,
        id_nacionalidad,
        vehiculos,
      } = usuarioAEditar;
      
      const categoriasArray = Array.isArray(categorias) 
        ? categorias 
        : categorias ? [categorias] : [];
      
      const sectoresArray = Array.isArray(sectores) 
        ? sectores 
        : sectores ? [sectores] : [];

      const sucursalesArray = Array.isArray(sucursales) 
        ? sucursales 
        : sucursales ? [sucursales] : [];

      const vehiculosArray = Array.isArray(vehiculos) 
        ? vehiculos 
        : vehiculos ? [vehiculos] : [];
      
      const tipoDniValue = id_tipo_dni || 1;

      const carnetsArray = Array.isArray(carnets) && carnets.length > 0 
        ? carnets 
        : [initialCarnetState];

      setUser(prevState => ({
        ...prevState,
        nombre,
        apellido, 
        usuario,
        email,
        id_rol, 
        activo, 
        sucursales: sucursalesArray,
        categorias: categoriasArray,
        sectores: sectoresArray,
        dni: dni || '',
        id_tipo_dni: tipoDniValue,
        fecha_nacimiento: fecha_nacimiento || '',
        fecha_vencimiento_dni: fecha_vencimiento_dni || "",
        fecha_ingreso: fecha_ingreso || '',
        telefono: telefono || '',
        carnets: carnetsArray,
        id_turno: id_turno || '',
        vehiculos: vehiculosArray,
        id_nacionalidad: id_nacionalidad || '',
      }));
      
      if (restaurar !== null) {
        setResetPasswordSent(true);
      }
    }
  }, [usuarioAEditar]);

  const handleChange = event => {
    const { name, value } = event.target;
    
    if (name === 'id_tipo_dni') {
      setUser({ ...user, [name]: parseInt(value, 10) });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleCarnetChange = (index, field, value) => {
    const updatedCarnets = [...user.carnets];
    updatedCarnets[index] = {
      ...updatedCarnets[index],
      [field]: value
    };
    setUser({ ...user, carnets: updatedCarnets });
  };

  const addCarnet = () => {
    if (user.carnets.length < 4) {
      setUser({
        ...user,
        carnets: [...user.carnets, { ...initialCarnetState }]
      });
    }
  };

  const removeCarnet = (index) => {
    if (user.carnets.length > 1) {
      const updatedCarnets = user.carnets.filter((_, i) => i !== index);
      setUser({ ...user, carnets: updatedCarnets });
    }
  };

  const handleMultipleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleDeleteChip = (name, valueToDelete) => {
    setUser({
      ...user,
      [name]: (user[name] || []).filter(item => item !== valueToDelete),
    });
  };

  const onSuccess = () => history.push('/user/users');

  const onSaveUser = e => {
    e.preventDefault();
    console.log('on save user', user);
    
    const userToSend = {
      ...user,
      categorias: Array.isArray(user.categorias) ? user.categorias : [],
      sectores: Array.isArray(user.sectores) ? user.sectores : [],
      sucursales: Array.isArray(user.sucursales) ? user.sucursales : [],
      vehiculos: Array.isArray(user.vehiculos) ? user.vehiculos : [],
      carnets: user.carnets.filter(carnet => 
        carnet.id_tipo_carnet && carnet.fecha_vencimiento_carnet
      )
    };
    
    dispatch(postUsuario(userToSend, onSuccess));
  };

  const onUpdateUser = e => {
    e.preventDefault();
    const { 
      nombre, 
      apellido, 
      id_rol, 
      email, 
      activo, 
      categorias, 
      sectores, 
      sucursales,
      dni, 
      id_tipo_dni,
      fecha_nacimiento, 
      fecha_vencimiento_dni,
      fecha_ingreso, 
      telefono,
      carnets,
      id_turno,
      id_nacionalidad,
      vehiculos,
    } = user;
    
    const userToUpdate = {
      nombre,
      apellido, 
      id_rol, 
      email,
      activo,
      categorias: Array.isArray(categorias) ? categorias : [],
      sectores: Array.isArray(sectores) ? sectores : [],
      sucursales: Array.isArray(sucursales) ? sucursales : [],
      dni,
      id_tipo_dni,
      fecha_vencimiento_dni,
      fecha_nacimiento,
      fecha_ingreso,
      telefono,
      carnets: carnets.filter(carnet => 
        carnet.id_tipo_carnet && carnet.fecha_vencimiento_carnet
      ),
      id_turno,
      id_nacionalidad,
      vehiculos: Array.isArray(vehiculos) ? vehiculos : [],
    };
    
    dispatch(updateUsuario(id, userToUpdate, onSuccess));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const categoriasCount = (user.categorias || []).length;
  const sectoresCount = (user.sectores || []).length;
  const sucursalesCount = (user.sucursales || []).length;
  const vehiculosCount = (user.vehiculos || []).length;

  return (
    <React.Fragment>
      <Box className={classes.pageFull}>
        <Header perfilDetail={{ name: 'Usuarios', location: '/user/users/add', profile_pic: '/images/auth/profile.png' }} />
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
                     
                    <Grid container spacing={3} className={classes.fullWidthGrid}>
                      {/* Sección de Datos Personales */}
                      <Grid item xs={12} className={classes.sectionContainer}>
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

                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl style={{marginTop: "-14px"}} component="fieldset" className={classes.radioField}>
                          <FormLabel component="legend" className={classes.radioLabel}>
                            Tipo Doc.
                          </FormLabel>
                          <RadioGroup
                            name="id_tipo_dni"
                            value={user.id_tipo_dni.toString()}
                            onChange={handleChange}
                            className={classes.radioGroup}
                          >
                            {TIPOS_DNI.map((tipo) => (
                              <FormControlLabel
                                key={tipo.id}
                                value={tipo.id.toString()}
                                control={<Radio size="small" color="primary" />}
                                label={tipo.descripcion}
                                className={classes.formControlLabel}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl> 
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}> 
                        <Box className={classes.dniContainer}>
                          <TextField
                            name="dni" 
                            label="Número de Documento"
                            required
                            fullWidth
                            variant="outlined"
                            className={classes.dniField}
                            value={user.dni}
                            onChange={handleChange}
                            InputLabelProps={{
                              shrink: true,
                              className: classes.inputLabel,
                            }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="fecha_vencimiento_dni"
                          label="Fecha de Vencimiento de D.N.I."
                          type="date"
                          required
                          fullWidth
                          variant="outlined"
                          className={classes.textField}
                          value={user.fecha_vencimiento_dni}
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
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                          <InputLabel 
                            id="nacionalidad-dropdown"
                            className={classes.inputLabel}
                          >
                            Nacionalidad
                          </InputLabel>
                          <Select
                            name="id_nacionalidad"
                            labelId="nacionalidad-dropdown"
                            value={user.id_nacionalidad || ''}
                            onChange={handleChange}
                            label="Nacionalidad"
                          >
                            {listaNacionalidades && listaNacionalidades.map(n => (
                              <MenuItem key={n.id} value={n.id}>
                                {n.descripcion}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                          <InputLabel 
                            style={{marginTop: "10px"}}
                            id="roles-dropdown"
                            className={classes.inputLabel}
                          >
                            Rol de Sistema
                          </InputLabel>
                          <Select
                            name="id_rol"
                            labelId="roles-dropdown"
                            required
                            value={user.id_rol || ''}
                            onChange={handleChange}
                            label="Rol"
                          >
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
                            id="categoria-dropdown"
                            className={classes.inputLabel}
                          >
                            Categorías {categoriasCount > 0 && <span className={classes.counterBadge}>{categoriasCount}</span>}
                          </InputLabel>
                          <Select
                            name="categorias"
                            labelId="categoria-dropdown"
                            multiple
                            required
                            value={user.categorias || []}
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
                                        style={{ marginTop: "8px"}}
                                        key={value} 
                                        label={categoria ? categoria.descripcion : value} 
                                        className={classes.chip}
                                        onDelete={() => handleDeleteChip('categorias', value)}
                                        deleteIcon={<span className={classes.chipDelete}>×</span>}
                                        size="small"
                                      />
                                    );
                                  })
                                )}
                              </div>
                            )}
                            MenuProps={MenuProps}
                          >
                            {listaCategorias.map((categoria) => (
                              <MenuItem
                                key={categoria.id}
                                value={categoria.id}
                                style={getStyles(categoria, user.categorias || [], theme)}
                                className={(user.categorias || []).includes(categoria.id) ? classes.menuItemSelected : ''}
                              >
                                <CheckCircleIcon 
                                  className={classes.checkIcon}
                                  style={{ 
                                    visibility: (user.categorias || []).includes(categoria.id) ? 'visible' : 'hidden',
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
                            name="sectores"
                            labelId="sector-dropdown" 
                            multiple
                            required
                            value={user.sectores || []}
                            onChange={handleMultipleChange}
                            input={<OutlinedInput label={`Sectores ${sectoresCount > 0 ? `(${sectoresCount})` : ''}`} /> }
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
                                        style={{ marginTop: "8px"}}
                                        key={value} 
                                        label={sector ? sector.descripcion : value} 
                                        className={classes.chip}
                                        onDelete={() => handleDeleteChip('sectores', value)}
                                        deleteIcon={<span className={classes.chipDelete}>×</span>}
                                        size="medium"
                                      />
                                    );
                                  })
                                )}
                              </div>
                            )}
                            MenuProps={MenuProps}
                          >
                            {listaSectores.map((sector) => (
                              <MenuItem
                                key={sector.id}
                                value={sector.id}
                                style={getStyles(sector, user.sectores || [], theme)}
                                className={(user.sectores || []).includes(sector.id) ? classes.menuItemSelected : ''}
                              >
                                <CheckCircleIcon 
                                  className={classes.checkIcon}
                                  style={{ 
                                    visibility: (user.sectores || []).includes(sector.id) ? 'visible' : 'hidden',
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
                            id="sucursales-dropdown"
                            className={classes.inputLabel}
                          >
                            Sucursales {sucursalesCount > 0 && <span className={classes.counterBadge}>{sucursalesCount}</span>}
                          </InputLabel>
                          <Select
                            name="sucursales"
                            labelId="sucursales-dropdown"
                            multiple
                            value={user.sucursales || []}
                            onChange={handleMultipleChange}
                            input={<OutlinedInput label={`Sucursales ${sucursalesCount > 0 ? `(${sucursalesCount})` : ''}`} />}
                            renderValue={(selected) => (
                              <div className={classes.chipsContainer}>
                                {selected.length === 0 ? (
                                  <Typography variant="body2" color="textSecondary">
                                    Seleccione sucursales...
                                  </Typography>
                                ) : (
                                  selected.map((value) => {
                                    const sucursal = listaSucursales.find(suc => suc.id === value);
                                    return (
                                      <Chip 
                                        key={value} 
                                        style={{ marginTop: "5px"}}
                                        label={sucursal ? `${sucursal.descripcion} - ${sucursal.centro}` : value} 
                                        className={classes.chip}
                                        onDelete={() => handleDeleteChip('sucursales', value)}
                                        deleteIcon={<span className={classes.chipDelete}>×</span>}
                                        size="small"
                                      />
                                    );
                                  })
                                )}
                              </div>
                            )}
                            MenuProps={MenuProps}
                          >
                            {listaSucursales.map((sucursal) => (
                              <MenuItem
                                key={sucursal.id}
                                value={sucursal.id}  
                                style={getStyles(sucursal, user.sucursales || [], theme)}
                                className={(user.sucursales || []).includes(sucursal.id) ? classes.menuItemSelected : ''}
                              >
                                <CheckCircleIcon 
                                  className={classes.checkIcon}
                                  style={{ 
                                    visibility: (user.sucursales || []).includes(sucursal.id) ? 'visible' : 'hidden',
                                  }} 
                                />
                                {sucursal.descripcion} - {sucursal.centro}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText className={classes.helperText}>
                            Puede seleccionar múltiples sucursales
                          </FormHelperText>
                        </FormControl>
                      </Grid> 

                      {/* Sección de Datos de Acceso */}
                      <Grid item xs={12} className={classes.sectionContainer}>
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

                      {/* Sección de Documentación Carnet */}
                      <Grid item xs={12} className={classes.sectionContainer}>
                        <Divider className={classes.divider} />
                        <Typography className={classes.sectionTitle}>
                          Documentación Carnet 
                          {!esConductor && (
                            <Typography variant="body2" component="span" style={{ marginLeft: 8, fontStyle: 'italic', color: '#7f8c8d' }}>
                              (Solo para conductores)
                            </Typography>
                          )}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} className={classes.fullWidthContainer}>
                        <Collapse in={esConductor} className={classes.conditionalSection}>
                          <Box className={classes.fullWidthContainer}>
                            {/* Información sobre tipos de carnet CORREGIDA */}
                            <Paper className={classes.infoPaper}>
                              <Typography className={classes.infoTitle}>
                                💡 Información sobre tipos de carnet:
                              </Typography>
                              <Box className={classes.infoList}>
                                <Typography className={classes.infoItem}>
                                  <strong>Municipal </strong> Chofer de fábrica, servicio urbano, servicios locales (Necesario para ser Chofer Turista e Interurbano)
                                </Typography>
                                <Typography className={classes.infoItem}>
                                  <strong>Transporte</strong> Chofer de interurbano, transporte de pasajeros entre ciudades
                                </Typography>
                                <Typography className={classes.infoItem}>
                                  <strong>Turismo </strong> Chofer de Servicios turísticos, transporte de turistas
                                </Typography>
                                <Typography className={classes.infoItem}>
                                 
                                </Typography>
                              </Box>
                            </Paper>

                            <Button
                              variant="outlined"
                              color="primary"
                              startIcon={<AddIcon />}
                              onClick={addCarnet}
                              disabled={user.carnets.length >= 4}
                              className={classes.addCarnetButton}
                            >
                              Agregar Carnet ({user.carnets.length}/4)
                            </Button>

                            {user.carnets.map((carnet, index) => (
                              <Card key={index} className={classes.carnetCard}>
                                <CardContent>
                                  <Box className={classes.carnetHeader}>
                                    <Typography className={classes.carnetTitle}>
                                      Carnet de Conducir #{index + 1}
                                    </Typography>
                                    {user.carnets.length > 1 && (
                                      <IconButton 
                                        size="small" 
                                        onClick={() => removeCarnet(index)}
                                        className={classes.deleteCarnetButton}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    )}
                                  </Box>

                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={4}>
                                      <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel 
                                          id={`tipo-carnet-dropdown-${index}`}
                                          className={classes.inputLabel}
                                        >
                                          <Box className={classes.selectLabel}>
                                            Tipo de Carnet
                                            <Tooltip 
                                              title="Seleccione el tipo de carnet según el uso requerido" 
                                              arrow
                                              placement="top"
                                            >
                                              <InfoIcon className={classes.infoIcon} />
                                            </Tooltip>
                                          </Box>
                                        </InputLabel>
                                        <Select
                                          value={carnet.id_tipo_carnet || ''}
                                          onChange={(e) => handleCarnetChange(index, 'id_tipo_carnet', e.target.value)}
                                          label={
                                            <Box className={classes.selectLabel}>
                                              Tipo de Carnet
                                              <Tooltip 
                                                title="Seleccione el tipo de carnet según el uso requerido" 
                                                arrow
                                                placement="top"
                                              >
                                                <InfoIcon className={classes.infoIcon} />
                                              </Tooltip>
                                            </Box>
                                          }
                                        >
                                          {listaTiposCarnet && listaTiposCarnet.map(tipo => {
                                            const info = INFO_TIPOS_CARNET[tipo.id];
                                            return (
                                              <MenuItem 
                                                key={tipo.id} 
                                                value={tipo.id}
                                              >
                                                <Box>
                                                  <Typography variant="body1">
                                                    {tipo.descripcion}
                                                  </Typography>
                                                  {info && (
                                                    <Typography variant="caption" color="textSecondary">
                                                      {info.usos.join(', ')}
                                                    </Typography>
                                                  )}
                                                </Box>
                                              </MenuItem>
                                            );
                                          })}
                                        </Select>
                                        <FormHelperText className={classes.helperText}>
                                          Seleccione el tipo según el uso del conductor
                                        </FormHelperText>
                                      </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                      <TextField
                                        label="Fecha Vencimiento Carnet"
                                        type="date"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        className={classes.textField}
                                        value={carnet.fecha_vencimiento_carnet || ''}
                                        onChange={(e) => handleCarnetChange(index, 'fecha_vencimiento_carnet', e.target.value)}
                                        InputLabelProps={{
                                          shrink: true,
                                          className: classes.inputLabel,
                                        }}
                                      />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6} md={4}>
                                      <TextField
                                        label="Captura de Carnet de Conducir"
                                        fullWidth
                                        variant="outlined"
                                        className={classes.textField}
                                        value={carnet.img_carnet || ''}
                                        onChange={(e) => handleCarnetChange(index, 'img_carnet', e.target.value)}
                                        InputLabelProps={{
                                          shrink: true,
                                          className: classes.inputLabel,
                                        }}
                                        helperText="URL o ruta de la imagen del carnet"
                                      />
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              </Card>
                            ))}

                            {/* DETECCIÓN AUTOMÁTICA Y VALIDACIÓN ÚNICA AL FINAL */}
                            <Box className={classes.validationContainer}>
                              {/* Detección automática del tipo de conductor */}
                              {deteccionAutomaticaConductor.mensaje && (
                                <Paper className={deteccionAutomaticaConductor.cumplido ? classes.successPaper : classes.infoPaper}>
                                  <Typography className={`${classes.validationTitle} ${deteccionAutomaticaConductor.cumplido ? classes.successTitle : classes.infoTitle}`}>
                                    {deteccionAutomaticaConductor.cumplido ? '' : 'ℹ️'}  
                                  </Typography>
                                  <Typography className={classes.validationItem}>
                                    {deteccionAutomaticaConductor.mensaje}
                                  </Typography>
                                </Paper>
                              )}

                              {/* Validaciones específicas por categoría */}
                              {(validacionCarnets.tieneCumplidos || validacionCarnets.tieneValidaciones) && (
                                <React.Fragment>
                                  {validacionCarnets.tieneCumplidos && (
                                    <Paper className={classes.successPaper} style={{ marginTop: deteccionAutomaticaConductor.mensaje ? theme.spacing(2) : 0 }}>
                                      <Typography className={`${classes.validationTitle} ${classes.successTitle}`}>
                                        <CheckCircleIcon />
                                        Validaciones cumplidas:
                                      </Typography>
                                      <Box className={classes.validationList}>
                                        {validacionCarnets.mensajesCumplidos.map((mensaje, index) => (
                                          <Typography key={index} className={`${classes.validationItem} ${classes.successItem}`}>
                                            {mensaje}
                                          </Typography>
                                        ))}
                                      </Box>
                                    </Paper>
                                  )}
                                  
                                  {validacionCarnets.tieneValidaciones && (
                                    <Paper className={classes.warningPaper} style={{ 
                                      marginTop: (deteccionAutomaticaConductor.mensaje || validacionCarnets.tieneCumplidos) ? theme.spacing(2) : 0 
                                    }}>
                                      <Typography className={`${classes.validationTitle} ${classes.warningTitle}`}>
                                        <WarningIcon />
                                        Validaciones pendientes:
                                      </Typography>
                                      <Box className={classes.validationList}>
                                        {validacionCarnets.mensajes.map((mensaje, index) => (
                                          <Typography key={index} className={`${classes.validationItem} ${classes.warningItem}`}>
                                            {mensaje}
                                          </Typography>
                                        ))}
                                      </Box>
                                    </Paper>
                                  )}
                                </React.Fragment>
                              )}
                            </Box>
                          </Box>
                        </Collapse>

                        {!esConductor && (
                          <Typography className={classes.infoText}>
                            Esta sección está disponible solo para usuarios con categoría de Conductor
                          </Typography>
                        )}
                      </Grid>

                      {/* Sección de Datos Adicionales */}
                      <Grid item xs={12} className={classes.sectionContainer}>
                        <Divider className={classes.divider} />
                        <Typography className={classes.sectionTitle}>
                          Datos Adicionales - Asignaciones
                          {!esConductor && (
                            <Typography variant="body2" component="span" style={{ marginLeft: 8, fontStyle: 'italic', color: '#7f8c8d' }}>
                              (Solo para conductores)
                            </Typography>
                          )}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} className={classes.fullWidthContainer}>
                        <Collapse in={esConductor} className={classes.conditionalSection}>
                          <Grid container spacing={3} className={classes.conditionalGridContainer}>
                            <Grid item xs={12} sm={6} md={6} className={classes.conditionalGridItem}>
                              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel 
                                  id="turno-dropdown"
                                  className={classes.inputLabel}
                                >
                                  Turno
                                </InputLabel>
                                <Select
                                  name="id_turno"
                                  labelId="turno-dropdown"
                                  value={user.id_turno || ''}
                                  onChange={handleChange}
                                  label="Turno"
                                >
                                  {listaTurnos.map(turno => (
                                    <MenuItem key={turno.id} value={turno.id}>
                                      {turno.descripcion}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} className={classes.conditionalGridItem}>
                              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel 
                                  id="vehiculos-dropdown"
                                  className={classes.inputLabel}
                                >
                                  Vehículos {vehiculosCount > 0 && <span className={classes.counterBadge}>{vehiculosCount}</span>}
                                </InputLabel>
                                <Select
                                  name="vehiculos"
                                  labelId="vehiculos-dropdown"
                                  multiple
                                  value={user.vehiculos || []}
                                  onChange={handleMultipleChange}
                                  input={<OutlinedInput label={`Vehículos ${vehiculosCount > 0 ? `(${vehiculosCount})` : ''}`} />}
                                  renderValue={(selected) => (
                                    <div className={classes.chipsContainer}>
                                      {selected.length === 0 ? (
                                        <Typography variant="body2" color="textSecondary">
                                          Seleccione vehículos...
                                        </Typography>
                                      ) : (
                                        selected.map((value) => {
                                          const vehiculo = listaVehiculos.find(veh => veh.id === value);
                                          return (
                                            <Chip 
                                              key={value} 
                                              label={vehiculo ? `${vehiculo.placa} - ${vehiculo.modelo}` : value} 
                                              className={classes.chip}
                                              onDelete={() => handleDeleteChip('vehiculos', value)}
                                              deleteIcon={<span className={classes.chipDelete}>×</span>}
                                              size="small"
                                            />
                                          );
                                        })
                                      )}
                                    </div>
                                  )}
                                  MenuProps={MenuProps}
                                >
                                  {listaVehiculos.map((vehiculo) => (
                                    <MenuItem
                                      key={vehiculo.id}
                                      value={vehiculo.id}
                                      style={getStyles(vehiculo, user.vehiculos || [], theme)}
                                      className={(user.vehiculos || []).includes(vehiculo.id) ? classes.menuItemSelected : ''}
                                    >
                                      <CheckCircleIcon 
                                        className={classes.checkIcon}
                                        style={{ 
                                          visibility: (user.vehiculos || []).includes(vehiculo.id) ? 'visible' : 'hidden',
                                        }} 
                                      />
                                      {vehiculo.placa} - {vehiculo.modelo}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <FormHelperText className={classes.helperText}>
                                  Puede seleccionar múltiples vehículos
                                </FormHelperText>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Collapse>

                        {!esConductor && (
                          <Typography className={classes.infoText}>
                            Esta sección está disponible solo para usuarios con categoría de Conductor
                          </Typography>
                        )}
                      </Grid>

                      {/* Botones de acción */}
                      <Grid item xs={12} className={classes.sectionContainer}>
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