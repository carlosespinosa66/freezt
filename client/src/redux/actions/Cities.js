import axios from 'axios';


export function getCitiesBilling(filter) {
    return async function(dispatch) {
      dispatch({ type: 'GET_CITIES_BILLING_REQUEST' });
      try {
        const allCities = await axios.get('/api/cities?code=' + filter);
        dispatch({
          type: 'GET_CITIES_BILLING_SUCCESS',
          payload: allCities.data.data,
        });
      } catch (error) {
        dispatch({
          type: 'GET_CITIES_BILLING_FAIL',
          payload: { message: error.message },
        });
      }
    };
  }

  export function getCitiesShipping(filter) {
    return async function(dispatch) {
      dispatch({ type: 'GET_CITIES_SHIPPING_REQUEST' });
      try {
        const allCities = await axios.get('/api/cities?code=' + filter);
        dispatch({
          type: 'GET_CITIES_SHIPPING_SUCCESS',
          payload: allCities.data.data,
        });
      } catch (error) {
        dispatch({
          type: 'GET_CITIES_SHIPPING_FAIL',
          payload: { message: error.message },
        });
      }
    };
  }