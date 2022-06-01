import axios from 'axios';

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
      const newOrder = await axios.post(
        '/api/auth/orders',
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentSource: paymentMethod,
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
        type: 'ORDER_CREATE_SUCCESS',
        payload: newOrder.data,
      });
    } catch (error) {
      dispatch({
        type: 'ORDER_CREATE_FAIL',
        payload: { status: error },
      });
    }
  };
}

export const updateOrderStatus = (id, status, token) => {
  return async (dispatch) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS_REQUEST' });
    try {
      await axios.put(`/api/admin/orders/state/${id}`, status, {
        headers: {
          'auth-token': token,
        },
      });
      dispatch({
        type: 'UPDATE_ORDER_STATUS_SUCCESS',
        payload: '',
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_ORDER_STATUS__FAIL',
        payload: error.message,
        // payload: { status: error },
      });
    }
  };
};

//Normal User History Order
export function getOrdersHistoryUser(token) {
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

//Detalle de la orden desde el historial
export function getOrderHistoryDetail(token, id) {
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

export function getFilterOrders(status, token) {
  return async function(dispatch) {
    dispatch({ type: 'ORDERS_FILTER_REQUEST' });
    try {
      const filterOrder = await axios.get('/api/orders/state?status=' + status, {
        headers: {
          'auth-token': token,
        },
      });
      dispatch({
        type: 'ORDERS_FILTER_SUCCESS',
        payload: filterOrder.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'ORDERS_FILTER_FAIL',
        payload: error.response.data.errorMsg,
      });
    }
  };
}

export function regPaypalOrder(id, info, token) {
  return async function(dispatch) {
    try {
      const payOrder = await axios.put(
        `api/auth/orders/pay/${id}`,
        { info },
        {
          headers: { 'auth-token': token },
        }
      );

      dispatch({
        type: 'PAY_ORDER_SUCCESS',
        payload: payOrder.data,
      });
    } catch (error) {
      dispatch({
        type: 'PAY_ORDER_FAIL',
        payload: { status: error.response.status },
      });
    }
  };
}

export function regNormalOrder(id, info, token) {
  return async function(dispatch) {
    try {
      const payOrder = await axios.put(
        `api/auth/orders/normal/${id}`,
        { info },
        {
          headers: { 'auth-token': token },
        }
      );

      dispatch({
        type: 'PAY_ORDER_SUCCESS',
        payload: payOrder.data,
      });
    } catch (error) {
      dispatch({
        type: 'PAY_ORDER_FAIL',
        payload: error,
        // payload: { status: error.response.status },
      });
    }
  };
}




export function putClearOrders() {
  return {
    type: 'CLEAR_ORDERS_STATE',
    payload: '',
  };
}
