const initialState = {
  products: [],
  detail: [],
  loading: [],
  error: [],

  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  }
};
// userinfo:[],
// cart: {
//   cartItems: [],
// }

function rootReducer(state = initialState, action) {

  switch (action.type) {
    case "PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: "",
      };

    case "PRODUCTS_FAIL":
      return {
        ...state,
        loading: false,
        products: "",
        error: action.payload,
      };

    case "PRODUCTS_REQUEST_DETAIL":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "PRODUCTS_SUCCESS_DETAIL":
      return {
        ...state,
        detail: action.payload,
        loading: false,
        error: "",
      };

    case "PRODUCTS_FAIL_DETAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const itemToVerify = state.cart.cartItems.find((x) => x._id === newItem._id);
      const cartItems = itemToVerify ? state.cart.cartItems.map((item) => item._id === itemToVerify._id ? newItem : item)
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state, cart: { ...state.cart, cartItems },
        loading: false,
        error: "",
      };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cart: { ...state.cart, cartItems },
        loading: false,
        error: action.payload,
      };
    };

    case "USER_SIGNIN":
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        userinfo: action.payload,
        loading: false,
        error: "",
      };
    case "USER_SIGN_OUT":
      localStorage.removeItem('userInfo');
      return {
        ...state,
        userinfo: null,
        loading: false,
        error: "",
      };

    default:
      return state;
  }
}

export default rootReducer;