import {
  ADD_TURNO,
  DELETE_TURNO,
  EDIT_TURNO,
  GET_TURNOS,
  GET_TURNO_BY_ID,
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';

export const getTurnos = () => {
  console.log("turnos");
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/turnos');
      dispatch({ type: GET_TURNOS, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const getTurnoById = id => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get(`/turno/${id}`);
      dispatch({ type: GET_TURNO_BY_ID, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const addTurno = (turno, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.post('/turno', { ...turno });
      dispatch({ type: ADD_TURNO, payload: data });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const editTurno = (data, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.put(`/turno/${data.id}`, data);
      dispatch({ type: EDIT_TURNO, payload: data });
      dispatch(fetchSuccess('Turno editado correctamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const deleteTurno = (id, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.delete(`/turno/${id}`);
      dispatch({ type: DELETE_TURNO, payload: id });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};