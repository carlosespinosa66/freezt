import axios from "axios";
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';

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

export function removeItemtCar(item) {
  return {
    type: "CART_REMOVE_ITEM",
    payload: item,
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

export function regUserInfo(name,email, password) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post('/users/signup', {name,email, password });
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

export function loadPayPalScript() {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  return async function (dispatch) {
    try {
      const { data: clientId } = await axios.post('/admin/paypal'); //,
      // { headers: { autorization: `${userinfo.token}` }, });
      paypalDispatch({
        type: "RESET_PAYPAL_OPTIONS",
        payload: {
          clientId: clientId,
          currency: 'USD'
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    } catch (error) {
      dispatch({
        type: "FAIL_PAYPAL_OPTIONS",
        payload: ({ message: error.message })
      });

    }
  };
}
