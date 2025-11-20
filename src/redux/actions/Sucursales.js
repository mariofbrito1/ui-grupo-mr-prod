import {
  ADD_SUCURSAL,
  DELETE_SUCURSAL,
  EDIT_SUCURSAL,
  GET_SUCURSALES,
  GET_SUCURSAL_BY_ID,
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';

export const getSucursales = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/sucursales');
      dispatch({ type: GET_SUCURSALES, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const getSucursalById = id => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get(`/sucursal/${id}`);
      dispatch({ type: GET_SUCURSAL_BY_ID, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const addSucursal = (sucursal, callback) => {
  return async dispatch => {
    try {
      console.log("sucursales..");
      dispatch(fetchStart());
      const { data } = await axios.post('/sucursal', { ...sucursal });
      dispatch({ type: ADD_SUCURSAL, payload: data });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const editSucursal = (data, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.put(`/sucursal/${data.id}`, data);
      dispatch({ type: EDIT_SUCURSAL, payload: data });
      dispatch(fetchSuccess('Sucursal editada correctamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const deleteSucursal = (id, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.delete(`/sucursal/${id}`);
      dispatch({ type: DELETE_SUCURSAL, payload: id });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};