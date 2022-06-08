const initialState = {
    loading: false,
    error: '',
    cities: [],
    cities_shipping: [],
  };
  
  
  export const citiesShippingReducer = (state = initialState, action) => {
      
    switch (action.type) {
 
        case 'GET_CITIES_SHIPPING_SUCCESS':
          return { ...state, cities_shipping: action.payload };
    
        case 'GET_CITIES_SHIPPING_FAIL':
          return { ...state, cities_shipping: null, loading: false };

      default:
        return state;
    }
  };
  
  export const citiesReducer = (state = initialState, action) => {
      
    switch (action.type) {
 
      case 'GET_CITIES_SUCCESS':
        return { ...state, cities: action.payload };
  
      case 'GET_CITIES_FAIL':
        return { ...state, cities: null, loading: false };

        default:
        return state;
    }
  };




  