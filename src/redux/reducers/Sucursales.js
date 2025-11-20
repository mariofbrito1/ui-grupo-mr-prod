import {
  ADD_SUCURSAL,
  DELETE_SUCURSAL,
  EDIT_SUCURSAL,
  GET_SUCURSALES,
  GET_SUCURSAL_BY_ID,
} from './../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaSucursales: [],
  sucursal: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SUCURSALES:
      return { ...state, listaSucursales: action.payload };
    case GET_SUCURSAL_BY_ID:
      return { ...state, sucursal: action.payload };
    case ADD_SUCURSAL:
      return { ...state, listaSucursales: [...state.listaSucursales, action.payload] };
    case EDIT_SUCURSAL:
      return {
        ...state,
        listaSucursales: state.listaSucursales.map(sucursal =>
          sucursal.id === action.payload.id ? action.payload : sucursal
        ),
      };
    case DELETE_SUCURSAL:
      return { 
        ...state, 
        listaSucursales: state.listaSucursales.filter(sucursal => sucursal.id !== action.payload) 
      };
    default:
      return state;
  }
};