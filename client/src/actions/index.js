import axios from 'axios';

export function getProducts() {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_REQUEST' });
    try {
      var json = await axios.get('/api/products');
      dispatch({
        type: 'PRODUCTS_SUCCESS',
        payload: json.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_FAIL',
        payload: { message: error.message },
      });
    }
  };
}

export function getProductDetail(slug) {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_REQUEST_DETAIL' });
    try {
      var json = await axios.get(`/api/products/${slug}`);
      dispatch({
        type: 'PRODUCTS_SUCCESS_DETAIL',
        payload: json.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_FAIL_DETAIL',
        payload: { message: error.message },
      });
    }
  };
}

export function addProductToCar(item) {
  return {
    type: 'CART_ADD_ITEM',
    payload: item,
  };
}

export function removeItemCar(item) {
  return {
    type: 'CART_REMOVE_ITEM',
    payload: item,
  };
}

export function removeAllCarItems() {
  return {
    type: 'CART_CLEAR',
    payload: '',
  };
}

export function getUserInfo(email, password) {
  return async function(dispatch) {
    try {
      const response = await axios.post('/api/signIn', { email, password });
      const TOKEN = response.headers['auth-token'];
      dispatch({
        type: 'USER_SIGNIN',
        payload: {
          email,
          token: TOKEN,
          name: response.data.data.name,
          role: response.data.data.role,
          google: false,
        },
      });
    } catch (error) {
      dispatch({
        type: 'USER_SIGNIN_FAIL',
        payload: '', //{ status: error.response.status },
      });
    }
  };
}

export function regUserInfo(name, email, password) {
  return async function(dispatch) {
    try {
      const { data } = await axios.post('/users/signup', {
        name,
        email,
        password,
      });
      dispatch({
        type: 'USER_SIGNUP',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'USER_SIGNUP_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
}

export function putUserSignOut() {
  return {
    type: 'USER_SIGN_OUT',
    payload: '',
  };
}

export function putUserReset() {
  return {
    type: 'USER_RESET_STATE',
    payload: '',
  };
}
export function saveShippingAddress(fullName, address, city, country) {
  return {
    type: 'SAVE_SHIPPING_ADDRESS',
    payload: { fullName, address, city, country },
  };
}

export function savePaymentMethod(paymentMethod) {
  return {
    type: 'SAVE_PAYMENT_METHOD',
    payload: paymentMethod,
  };
}

export function newOrderCreate(
  cartItems,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  token
) {
  return async function(dispatch) {
    dispatch({ type: 'ORDER_CREATE_REQUEST' });
    try {
      const data = await axios.post(
        '/api/auth/orders',
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        },
        {
          headers: { 'auth-token': token },
        }
      );
      dispatch({
        type: 'ORDER_CREATE_REQUEST_PROCESS',
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: 'ORDER_CREATE_REQUEST_PROCESS_FAIL',
        // payload: { status: error.response.status },
        payload: { status: error },
      });
    }
  };
}

export function getOrdersUser(token) {
  return async function(dispatch) {
    dispatch({ type: 'USER_ORDERS_REQUEST' });
    try {
      const userOrders = await axios.get('/api/auth/orders/user', {
        headers: {
          'auth-token': token,
        },
      });
      dispatch({
        type: 'USER_ORDERS_SUCCESS',
        payload: userOrders.data.data,
      });
    } catch (error) {
      dispatch({ type: 'USER_ORDERS_FAIL', payload: error.response.status });
    }
  };
}

export function getHistoryOrderUser(token, id) {
  return async function(dispatch) {
    try {
      const historyOrder = await axios.get(`/api/auth/orders/hist/${id}`, {
        headers: {
          'auth-token': token,
        },
      });
      dispatch({
        type: 'ORDER_FROM_HISTORY',
        payload: historyOrder.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'ORDER_FROM_HISTORY_FAIL',
        payload: error.response.status,
      });
    }
  };
}

export const getOrdersAdmin = (token) => {
  return async function(dispatch) {
    try {
      const allOrders = await axios.get(`/api/admin/orders`, {
        headers: {
          'auth-token': token,
        },
      });

      dispatch({
        type: 'ALL_ORDERS_ADMIN_SUCCESS',
        payload: allOrders.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'ALL_ORDERS_ADMIN_FAIL',
        payload: error.response.status,
      });
    }
  };
};

export function regPaypalOrder(id, info, token) {
  return async function(dispatch) {
    try {
      const data = await axios.put(
        `api/auth/orders/pay/${id}`,
        { info },
        {
          headers: { 'auth-token': token },
        }
      );

      dispatch({
        type: 'PAY_ORDER_SUCCESS',
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: 'PAY_ORDER_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
}
