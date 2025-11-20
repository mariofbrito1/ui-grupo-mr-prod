import {
  ADD_VEHICULO,
  DELETE_VEHICULO,
  EDIT_VEHICULO,
  GET_VEHICULOS,
  GET_VEHICULO_BY_ID,
} from './../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaVehiculos: [],
  vehiculo: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_VEHICULOS:
      return { ...state, listaVehiculos: action.payload };
    case GET_VEHICULO_BY_ID:
      return { ...state, vehiculo: action.payload };
    case ADD_VEHICULO:
      return { ...state, listaVehiculos: [...state.listaVehiculos, action.payload] };
    case EDIT_VEHICULO:
      return {
        ...state,
        listaVehiculos: state.listaVehiculos.map(vehiculo =>
          vehiculo.id === action.payload.id ? action.payload : vehiculo
        ),
      };
    case DELETE_VEHICULO:
      return { 
        ...state, 
        listaVehiculos: state.listaVehiculos.filter(vehiculo => vehiculo.id !== action.payload) 
      };
    default:
      return state;
  }
};