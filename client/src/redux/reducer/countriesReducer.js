const initialState = {
  loading: false,
  error: '',
  countries: [],
};

export const countriesReducer = (state = initialState, action) => {
    
  switch (action.type) {
    case 'GET_COUNTRIES_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'GET_COUNTRIES_SUCCESS':
      return { ...state, countries: action.payload };

    case 'GET_COUNTRIES_FAIL':
      return { ...state, countries: null, loading: false };

    default:
      return state;
  }
};
