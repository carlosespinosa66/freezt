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
  
  