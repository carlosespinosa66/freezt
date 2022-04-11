const initialState = {
  products: [],
  detail: [],
  loading: [],
  error: [],
  fullBox: false,
  order: {},
  successPay: false,
  loadingPay: false,
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : { location: {} },
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
};

function rootReducer(state = initialState, action) {

  switch (action.type) {
    case "PRODUCTS_REQUEST":
      return { ...state, loading: true, error: "", };

    case "PRODUCTS_SUCCESS":
      return { ...state, products: action.payload, loading: false, error: "", };

    case "PRODUCTS_FAIL":
      return { ...state, loading: false, products: "", error: action.payload, };

    case "PRODUCTS_REQUEST_DETAIL":
      return { ...state, loading: true, error: "", };

    case "PRODUCTS_SUCCESS_DETAIL":
      return { ...state, detail: action.payload, loading: false, error: "", };

    case "PRODUCTS_FAIL_DETAIL":
      return { ...state, loading: false, error: action.payload, };

    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const itemToVerify = state.cart.cartItems.find((x) => x._id === newItem._id);
      const cartItems = itemToVerify ?
        state.cart.cartItems.map((item) => item._id === itemToVerify._id ? newItem : item)
        : [...state.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems }, loading: false, error: "", };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems }, loading: false, error: action.payload, };
    };

    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "USER_SIGNIN":
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload, loading: false, error: "", };

    case "USER_SIGNUP":
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state, userInfo: action.payload, loading: false, error: "",
      };

    case "USER_SIGN_OUT":
      localStorage.removeItem('userInfo');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      return {
        ...state,
        userInfo: null,
        loading: false,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
        error: "",
      };

    case "USER_RESET_STATE":
      localStorage.removeItem('userInfo');
      return { ...state, userInfo: null, loading: false, error: "", };

    case "USER_SIGNIN_FAIL":
      localStorage.removeItem('userInfo');
      return { ...state, userInfo: null, loading: false, error: action.payload, };

    case 'SAVE_SHIPPING_ADDRESS':
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      return { ...state, cart: { ...state.cart, shippingAddress: action.payload, }, };

    case 'SAVE_PAYMENT_METHOD':
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
      return { ...state, cart: { ...state.cart, paymentMethod: action.payload }, };

    case 'ORDER_CREATE_REQUEST':
      return { ...state, loading: true };

    case 'ORDER_CREATE_SUCCESS':
      return { ...state, loading: false };

    case 'ORDER_CREATE_FAIL':
      return { ...state, loading: false };

    case 'ORDER_CREATE_REQUEST_PROCESS':
      localStorage.removeItem('cartItems');
      return { ...state, loading: false ,order:action.payload};

      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, order: action.payload, error: '' };
      case 'FETCH_FAIL':


    case 'SET_FULLBOX_ON':
      return { ...state, fullBox: true };
    case 'SET_FULLBOX_OFF':
      return { ...state, fullBox: false };
 
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };

    default:
      return state;
  }
}

export default rootReducer;



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