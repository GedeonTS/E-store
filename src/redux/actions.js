import axios from 'axios';
import getAll from './queries/queries';
import { GET_DATA, CHANGE_CURRENCY, GET_DETAILS } from './actionsType';

export const getData = (payload, cartArr) => ({ type: GET_DATA, payload, cartArr });

export const fetchData = (cartArr) => (dispatch) => {
  axios.post('http://localhost:4000/', {
    query: getAll,
  }).then((res) => {
    dispatch(getData(res.data, cartArr));
  });
};

export const changeCurrency = (value) => (dispatch) => {
  dispatch({
    type: CHANGE_CURRENCY,
    payload: { level: value },
  });
};

export const getDetails = (details) => (dispatch) => {
  dispatch({
    type: GET_DETAILS,
    details,
  });
};
