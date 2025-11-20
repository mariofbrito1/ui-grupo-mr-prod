import {
  ADD_TIPO_CARNET,
  DELETE_TIPO_CARNET,
  EDIT_TIPO_CARNET,
  GET_TIPOS_CARNET,
  GET_TIPO_CARNET_BY_ID,
} from './../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaTiposCarnet: [],
  tipoCarnet: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TIPOS_CARNET:
      return { ...state, listaTiposCarnet: action.payload };
    case GET_TIPO_CARNET_BY_ID:
      return { ...state, tipoCarnet: action.payload };
    case ADD_TIPO_CARNET:
      return { ...state, listaTiposCarnet: [...state.listaTiposCarnet, action.payload] };
    case EDIT_TIPO_CARNET:
      return {
        ...state,
        listaTiposCarnet: state.listaTiposCarnet.map(tipoCarnet =>
          tipoCarnet.id === action.payload.id ? action.payload : tipoCarnet
        ),
      };
    case DELETE_TIPO_CARNET:
      return { 
        ...state, 
        listaTiposCarnet: state.listaTiposCarnet.filter(tipoCarnet => tipoCarnet.id !== action.payload) 
      };
    default:
      return state;
  }
};