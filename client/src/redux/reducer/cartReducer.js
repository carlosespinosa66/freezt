const initialState = {
  loading: false,
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

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    
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
      localStorage.removeItem('cartItems');
      return { ...state, cart: { ...state.cart, cartItems: [] } };

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

    default:
      return state;
  }
};
