import axios from 'axios';

export function getCountries() {
    return async function(dispatch) {
      dispatch({ type: 'GET_COUNTRIES_REQUEST' });
      try {
        const allCountries = await axios.get('/api/countries/');
        dispatch({
          type: 'GET_COUNTRIES_SUCCESS',
          payload: allCountries.data.data,
        });
      } catch (error) {
        dispatch({
          type: 'GET_COUNTRIES_FAIL',
          payload: { message: error.message },
        });
      }
    };
  }

