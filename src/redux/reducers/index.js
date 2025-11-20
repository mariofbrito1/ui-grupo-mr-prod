import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import Usuarios from './Usuarios';
import Roles from './Roles'; 
import Categorias from './Categorias';  
import Sectores from './Sectores'; 
import TiposCarnet from './TiposCarnet';
import Turnos from './Turnos';
import Vehiculos from './Vehiculos';
import Sucursales from './Sucursales';
import Nacionalidades from './Nacionalidad';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    usuarios: Usuarios,
    roles: Roles, 
    categorias: Categorias, 
    sectores: Sectores,
    tiposCarnet: TiposCarnet,
    turnos: Turnos,
    vehiculos: Vehiculos,
    sucursales: Sucursales,
    nacionalidades: Nacionalidades,
  });
