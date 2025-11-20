import {
  ADD_NACIONALIDAD,
  DELETE_NACIONALIDAD,
  EDIT_NACIONALIDAD,
  GET_NACIONALIDADES,
  GET_NACIONALID_BY_ID,
} from './../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaNacionalidades: [],
  nacionalidad: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NACIONALIDADES:
      return { ...state, listaNacionalidades: action.payload };
    case GET_NACIONALID_BY_ID:
      return { ...state, nacionalidad: action.payload };
    case ADD_NACIONALIDAD:
      return { 
        ...state, 
        listaNacionalidades: [...state.listaNacionalidades, action.payload] 
      };
    case EDIT_NACIONALIDAD:
      return {
        ...state,
        listaNacionalidades: state.listaNacionalidades.map(nacionalidad =>
          nacionalidad.id === action.payload.id ? action.payload : nacionalidad
        ),
      };
    case DELETE_NACIONALIDAD:
      return { 
        ...state, 
        listaNacionalidades: state.listaNacionalidades.filter(nacionalidad => nacionalidad.id !== action.payload) 
      };
    default:
      return state;
  }
};