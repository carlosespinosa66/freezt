const initialState = {
  orders: [],
  totalorders: [],
  loading: false,
  orderHistory: [],
  order: [],
  error: '',
  fullBox: false,
  successPay: false,
  loadingPay: false,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ORDER_CREATE_REQUEST':
      return { ...state, loading: true };

    case 'ORDER_CREATE_FAIL':
      return { ...state, loading: false };

    case 'ORDER_CREATE_SUCCESS':
      return { ...state, loading: false, order: action.payload };

    case 'ORDERS_FILTER_SUCCESS':
      return {
        ...state,
        // totalorders: action.payload,
        orders: action.payload,
        orderHistory: [],
        products: [],
        loading: false,
      };

    case 'ORDERS_FILTER_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'ORDERS_FILTER_REQUEST':
      return { ...state, loading: true };

    case 'UPDATE_ORDER_STATUS_REQUEST':
      return { ...state, loading: true };

    case 'UPDATE_ORDER_STATUS_SUCCESS':
      return { ...state, loading: false };

    case 'UPDATE_ORDER_STATUS__FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'USER_ORDERS_REQUEST':
      return { ...state, loading: true };

    case 'USER_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        orderHistory: [],
        products: [],
        loading: false,
      };

    case 'USER_ORDERS_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'ORDER_FROM_HISTORY':
      return {
        ...state,
        orderHistory: action.payload,
        orders: [],
        products: [],
        loading: false,
      };

    case 'ALL_ORDERS_ADMIN_SUCCESS':
      return {
        ...state,
        // totalorders: action.payload,
        orders: action.payload,
        orderHistory: [],
        products: [],
        loading: false,
      };

    case 'PAY_ORDER_REQUEST':
      return { ...state, loadingPay: true };

    case 'PAY_ORDER_SUCCESS':
      localStorage.removeItem('order');
      localStorage.setItem('order', JSON.stringify(action.payload));
      return {
        ...state,
        loadingPay: false,
        successPay: true,
        order: action.payload,
      };

    case 'PAY_ORDER_FAIL':
      return { ...state, loadingPay: false, error: action.payload };

    case 'PAY_ORDER_RESET':
      return { ...state, loadingPay: false, successPay: false };

    case 'SET_FULLBOX_ON':
      return { ...state, fullBox: true };

    case 'SET_FULLBOX_OFF':
      return { ...state, fullBox: false };

    case 'CLEAR_ORDERS_STATE':
      return {
        ...state,
        loading: false,
        error: '',
        fullBox: false,
        order: {},
        orders: {},
        successPay: false,
        loadingPay: false,
      };

    default:
      return state;
  }
};

export default ordersReducer;

//     case 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION':
//       return {
//         ...state,
//         cart: {
//           ...state.cart,
//           shippingAddress: {
//             ...state.cart.shippingAddress,
//             location: action.payload,
//           },
//         },
//       };
