import {
  ADD_TIPO_CARNET,
  DELETE_TIPO_CARNET,
  EDIT_TIPO_CARNET,
  GET_TIPOS_CARNET,
  GET_TIPO_CARNET_BY_ID,
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';

export const getTiposCarnet = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/tipos_carnet');
      console.log("tipos carnt", data);
      dispatch({ type: GET_TIPOS_CARNET, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const getTipoCarnetById = id => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get(`/tipo_carnet/${id}`);
      dispatch({ type: GET_TIPO_CARNET_BY_ID, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const addTipoCarnet = (tipoCarnet, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.post('/tipo_carnet', { ...tipoCarnet });
      dispatch({ type: ADD_TIPO_CARNET, payload: data });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const editTipoCarnet = (data, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.put(`/tipo_carnet/${data.id}`, data);
      dispatch({ type: EDIT_TIPO_CARNET, payload: data });
      dispatch(fetchSuccess('Tipo de carnet editado correctamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const deleteTipoCarnet = (id, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.delete(`/tipo_carnet/${id}`);
      dispatch({ type: DELETE_TIPO_CARNET, payload: id });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};