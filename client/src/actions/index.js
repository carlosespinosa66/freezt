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
        payload: ({ message: error.message})
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
        payload: ({ message: error.message})
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
      const { data } = await axios.post('/users/signin', { email, password});
      dispatch({
        type: "USER_SIGNIN",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_SIGNIN_FAIL",
        payload: ({ message: error.message})
      });

    }
  };
}

export function putUserInfo() {
  return {
    type: "USER_SIGN_OUT",
    payload: "",
  };
}
