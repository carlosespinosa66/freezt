const initialState = {
    loading: false,
    error: '',
    cities_shipping: [],
    cities_billing: [],
  };
  
  
  export const citiesShippingReducer = (state = initialState, action) => {
      
    switch (action.type) {
 
        case 'GET_CITIES_SHIPPING_SUCCESS':
          return { ...state, cities_shipping: action.payload };
    
        case 'GET_CITIES_SHIPPING_FAIL':
          return { ...state, citie_shipping: null, loading: false };

      default:
        return state;
    }
  };
  
  export const citiesBillingReducer = (state = initialState, action) => {
      
    switch (action.type) {
 
      case 'GET_CITIES_BILLING_SUCCESS':
        return { ...state, cities_billing: action.payload };
  
      case 'GET_CITIES_BILLING_FAIL':
        return { ...state, cities_billing: null, loading: false };

        default:
        return state;
    }
  };
  