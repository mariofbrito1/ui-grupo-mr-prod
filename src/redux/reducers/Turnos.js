import {
  ADD_TURNO,
  DELETE_TURNO,
  EDIT_TURNO,
  GET_TURNOS,
  GET_TURNO_BY_ID,
} from './../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaTurnos: [],
  turno: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TURNOS:
      return { ...state, listaTurnos: action.payload };
    case GET_TURNO_BY_ID:
      return { ...state, turno: action.payload };
    case ADD_TURNO:
      return { ...state, listaTurnos: [...state.listaTurnos, action.payload] };
    case EDIT_TURNO:
      return {
        ...state,
        listaTurnos: state.listaTurnos.map(turno =>
          turno.id === action.payload.id ? action.payload : turno
        ),
      };
    case DELETE_TURNO:
      return { 
        ...state, 
        listaTurnos: state.listaTurnos.filter(turno => turno.id !== action.payload) 
      };
    default:
      return state;
  }
};