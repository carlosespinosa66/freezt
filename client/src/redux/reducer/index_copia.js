const initialState = {
  products: [],
  productedit: [],
  detail: [],
  error: '',
  orders: [],
  totalorders: [],
  loading: false,
  loadingPay: false,
  successPay: false,
  fullBox: false,
  orderHistory: [],
  users: [],
  userDetail: [],
  order:[],
  // order: localStorage.getItem('order')
  //   ? JSON.parse(localStorage.getItem('order'))
  //   : {},
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
    case 'ADMIN_GET_USERS':
      return { ...state, users: action.payload };

    case 'ADMIN_GET_USER_INFO':
      return { ...state, userDetail: action.payload };

    case 'PRODUCTS_ALL_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'PRODUCTS_ALL_SUCCESS':
      return {
        ...state,
        products: action.payload,
        orders: [],
        orderHistory: [],
        order: [],
        totalorders: [],
        detail: [],
        loading: false,
        error: '',
      };

    case 'PRODUCTS_ALL_FAIL':
      return { ...state, loading: false, products: '', error: action.payload };

    case 'PRODUCTS_CREATE_SUCCESS':
      return { ...state, loading: false, error: '' };

    case 'PRODUCTS_CREATE_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'PRODUCTS_CREATE_FAIL':
      return { ...state, loading: false, error: '' };

    case 'PRODUCTS_FILTER_SUCCESS':
      return {
        ...state,
        products: action.payload,
        orders: [],
        orderHistory: [],
        totalorders: [],
        detail: [],
        loading: false,
        error: '',
      };

    case 'ORDER_PRODUCTS_BY_ANY_ITEM':
      let sortedArr;
      if (action.payload === 'asc_stock') {
        sortedArr = state.products.sort(function(a, b) {
          if (a.stock > b.stock) {
            return 1;
          }
          if (b.stock > a.stock) {
            return -1;
          }
        });
      } else if (action.payload === 'desc_stock') {
        sortedArr = state.products.sort(function(a, b) {
          if (a.stock > b.stock) {
            return -1;
          }
          if (b.stock > a.stock) {
            return 1;
          }
        });
      } else if (action.payload === 'asc_price') {
        sortedArr = state.products.sort(function(a, b) {
          if (parseInt(a.price) > parseInt(b.price)) {
            return 1;
          }
          if (parseInt(b.price) > parseInt(a.price)) {
            return -1;
          }
        });
      } else if (action.payload === 'desc_price') {
        sortedArr = state.products.sort(function(a, b) {
          if (parseInt(a.price) > parseInt(b.price)) {
            return -1;
          }
          if (parseInt(b.price) > parseInt(a.price)) {
            return 1;
          }
        });
      } else if (action.payload === 'asc_name') {
        sortedArr = state.products.sort(function(a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
        });
      } else if (action.payload === 'desc_name') {
        sortedArr = state.products.sort(function(a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
        });
      }
      return {
        ...state,
        products: sortedArr,
      };

    case 'PRODUCTS_REQUEST_DETAIL':
      return { ...state, loading: true, error: '' };

    case 'PRODUCTS_SUCCESS_DETAIL':
      return { ...state, detail: action.payload, loading: false, error: '' };

    case 'PRODUCTS_FAIL_DETAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const itemToVerify = state.cart.cartItems.find(
        (x) => x.id === newItem.id
      );
      const cartItems = itemToVerify
        ? state.cart.cartItems.map((item) =>
            item.id === itemToVerify.id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return {
        ...state,
        cart: { ...state.cart, cartItems },
        loading: false,
        error: '',
      };

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cart: { ...state.cart, cartItems },
        loading: false,
        error: action.payload,
      };
    }

    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case 'USER_SIGNIN':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload, loading: false, error: '' };

    case 'USER_SIGNUP':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: '',
      };

    case 'USER_SIGN_OUT':
      localStorage.removeItem('userInfo');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      localStorage.removeItem('order');

      return {
        ...state,
        loading: false,
        error: '',
        fullBox: false,
        order: {},
        orders: {},
        successPay: false,
        loadingPay: false,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };

    case 'USER_RESET_STATE':
      localStorage.removeItem('userInfo');
      return { ...state, userInfo: null, loading: false, error: '' };

    case 'USER_SIGNIN_FAIL':
      localStorage.removeItem('userInfo');
      return {
        ...state,
        userInfo: null,
        loading: false,
        error: action.payload,
      };

    case 'SAVE_SHIPPING_ADDRESS':
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    case 'SAVE_PAYMENT_METHOD':
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    case 'ORDER_CREATE_REQUEST':
      return { ...state, loading: true };

    case 'ORDER_CREATE_FAIL':
      return { ...state, loading: false };

    case 'ORDER_CREATE_SUCCESS':
      // localStorage.setItem('order', JSON.stringify(action.payload));
      // localStorage.removeItem('cartItems');
      return { ...state, loading: false, order: action.payload };

      // ORDERS_FILTER_SUCCESS

    case 'UPDATE_ORDER_STATUS_REQUEST':
      return { ...state, loading: true };

    case 'UPDATE_ORDER_STATUS_SUCCESS':
      return { ...state, loading: false };

    case 'UPDATE_ORDER_STATUS__FAIL':
      return { ...state, loading: false };

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
        totalorders: action.payload,
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
      return { ...state, loadingPay: false };

    case 'PAY_ORDER_RESET':
      return { ...state, loadingPay: false, successPay: false };

    case 'SET_FULLBOX_ON':
      return { ...state, fullBox: true };

    case 'SET_FULLBOX_OFF':
      return { ...state, fullBox: false };

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
