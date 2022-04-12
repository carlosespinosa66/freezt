import axios from "axios";

export function getProducts() {
  return async function (dispatch) {
    dispatch({ type: "PRODUCTS_REQUEST" });
    try {
      var json = await axios.get('/products');
      dispatch({
        type: "PRODUCTS_SUCCESS",
        payload: json.data,
      });

    } catch (error) {
      dispatch({
        type: "PRODUCTS_FAIL",
        payload: ({ message: error.message })
      });

    }
  };
}

export function getProductDetail(slug) {
  return async function (dispatch) {
    dispatch({ type: "PRODUCTS_REQUEST_DETAIL" });
    try {
      var json = await axios.get(`/products/slug/${slug}`);
      dispatch({
        type: "PRODUCTS_SUCCESS_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      dispatch({
        type: "PRODUCTS_FAIL_DETAIL",
        payload: ({ message: error.message })
      });

    }
  };
}

export function addProductToCar(item) {
  return {
    type: "CART_ADD_ITEM",
    payload: item,
  };
}

export function removeItemCar(item) {
  return {
    type: "CART_REMOVE_ITEM",
    payload: item,
  };
}

export function removeAllItemsCar() {
  return {
    type: "CART_CLEAR",
    payload: "",
  };
}


export function getUserInfo(email, password) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post('/users/signin', { email, password });
      dispatch({
        type: "USER_SIGNIN",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_SIGNIN_FAIL",
        payload: ({ status: error.response.status })
      });

    }
  };
}

export function regUserInfo(name, email, password) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post('/users/signup', { name, email, password });
      dispatch({
        type: "USER_SIGNUP",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_SIGNUP_FAIL",
        payload: ({ status: error.response.status })
      });

    }
  };
}

export function putUserSignOut() {
  return {
    type: "USER_SIGN_OUT",
    payload: "",
  };
}

export function putUserReset() {
  return {
    type: "USER_RESET_STATE",
    payload: "",
  };
}
export function saveShippingAddress(fullName, address, city, country) {
  return {
    type: "SAVE_SHIPPING_ADDRESS",
    payload: { fullName, address, city, country },
  };
}

export function savePaymentMethod(paymentMethod) {
  return {
    type: "SAVE_PAYMENT_METHOD",
    payload: paymentMethod,
  };
}

export function newOrderCreate(cartItems, shippingAddress, paymentMethod,
  itemsPrice, shippingPrice, taxPrice, totalPrice, token) {
  return async function (dispatch) {
    dispatch({ type: "ORDER_CREATE_REQUEST" });
    try {
      const { data } = await axios.post('/orders',
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
          headers: {authorization: 'Bearer' + " " + token},
        }
      );
      dispatch({
        type: "ORDER_CREATE_REQUEST_PROCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ORDER_CREATE_REQUEST_PROCESS_FAIL",
        payload: ({ status: error.response.status })
      });
    }
  };
};

export function getOrder(orderId, token) {
  return async function (dispatch) {
    try {
      dispatch({ type: 'FETCH_ORDER_REQUEST' });
      const { data } = await axios.get(`/orders/${orderId}`, {
        headers: { authorization: "Bearer" + " " + token },
      });
      dispatch({
        type: 'FETCH_ORDER_SUCCESS',
        payload: data
      });
    } catch (err) {
      dispatch({ type: 'FETCH_ORDER_FAIL', payload: err.response.status });
    }
  };
}
  // export function loadPayPalScript() {
  //   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  //   return async function (dispatch) {
  //     try {
  //       const { data: clientId } = await axios.post('/admin/paypal'); //,
  //       // { headers: { autorization: `${userinfo.token}` }, });
  //       paypalDispatch({
  //         // type: "RESET_PAYPAL_OPTIONS",
  //         type:'resetOptions',
  //         payload: {
  //           'client-id': clientId,
  //           currency: 'USD'
  //         },
  //       });
  //       paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
  //     } catch (error) {
  //       dispatch({
  //         type: "FAIL_PAYPAL_OPTIONS",
  //         payload: ({ message: error.message })
  //       });

  //     }
  //   };
  // }


  // export function onApprove(data, actions,id,token) {
  //   return actions.order.capture().then(async function (details,dispatch) {
  //     try {
  //       dispatch({ type: 'PAY_REQUEST' });
  //       const { data } = await axios.put(`/api/orders/${id}/pay`, details,
  //         {
  //           headers: { authorization: `Bearer ${token}` },
  //         }
  //       );
  //       dispatch({ type: 'PAY_SUCCESS', payload: data });
  //     } catch (err) {
  //       dispatch({ type: 'PAY_FAIL', payload: err.message });
        
  //     }
  //   });
  // }


