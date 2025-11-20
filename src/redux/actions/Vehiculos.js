import {
  ADD_VEHICULO,
  DELETE_VEHICULO,
  EDIT_VEHICULO,
  GET_VEHICULOS,
  GET_VEHICULO_BY_ID,
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';

export const getVehiculos = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/unidades_vehiculo');
      dispatch({ type: GET_VEHICULOS, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const getVehiculoById = id => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get(`/unidades_vehiculo/${id}`);
      dispatch({ type: GET_VEHICULO_BY_ID, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const addVehiculo = (vehiculo, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.post('/unidades_vehiculo', { ...vehiculo });
      dispatch({ type: ADD_VEHICULO, payload: data });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const editVehiculo = (data, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.put(`/unidades_vehiculo/${data.id}`, data);
      dispatch({ type: EDIT_VEHICULO, payload: data });
      dispatch(fetchSuccess('Vehículo editado correctamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const deleteVehiculo = (id, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.delete(`/unidades_vehiculo/${id}`);
      dispatch({ type: DELETE_VEHICULO, payload: id });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};