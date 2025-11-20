import {
  ADD_NACIONALIDAD,
  DELETE_NACIONALIDAD,
  EDIT_NACIONALIDAD,
  GET_NACIONALIDADES,
  GET_NACIONALID_BY_ID,
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';

export const getNacionalidades = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/nacionalidades');
      dispatch({ type: GET_NACIONALIDADES, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const getNacionalidadById = id => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get(`/nacionalidad/${id}`);
      dispatch({ type: GET_NACIONALID_BY_ID, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const addNacionalidad = (nacionalidad, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.post('/nacionalidad', { ...nacionalidad });
      dispatch({ type: ADD_NACIONALIDAD, payload: data.nuevoTipo || data });
      dispatch(fetchSuccess(data.success || 'Nacionalidad creada exitosamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const editNacionalidad = (data, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const response = await axios.put(`/nacionalidad/${data.id}`, data);
      dispatch({ type: EDIT_NACIONALIDAD, payload: response.data.tipoActualizado || data });
      dispatch(fetchSuccess(response.data.success || 'Nacionalidad editada correctamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const deleteNacionalidad = (id, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.delete(`/nacionalidad/${id}`);
      dispatch({ type: DELETE_NACIONALIDAD, payload: id });
      dispatch(fetchSuccess(data.success || 'Nacionalidad eliminada exitosamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};