import axios from 'axios';

export function getProducts() {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_ALL_REQUEST' });
    try {
      var json = await axios.get('/api/products');
      dispatch({
        type: 'PRODUCTS_ALL_SUCCESS',
        payload: json.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_ALL_FAIL',
        payload: { message: error.message },
      });
    }
  };
}

export const getSearchProducts = (filter) => {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_SEARCH_REQUEST' });
    try {
      const productSearch = await axios.get('/api/products/search?name=' + filter);

      return {
        type: 'PRODUCTS_SEARCH_SUCCESS',
        payload: productSearch.data.data,
      };
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_SEARCH_FAIL',
        payload: { message: error.message },
      });
    }
  };
};

export function getFilterProductsGenres(filter) {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_FILTER_REQUEST' });
    try {
      const json = await axios.get('/api/products/genres?genres=' + filter);

      dispatch({
        type: 'PRODUCTS_FILTER_SUCCESS',
        payload: json.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_FILTER_FAIL',
        payload: { message: error.message },
      });
    }
  };
}

export function getFilterProductsType(filter) {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_FILTER_REQUEST' });
    try {
      const json = await axios.get('/api/products/type?type=' + filter);

      dispatch({
        type: 'PRODUCTS_FILTER_SUCCESS',
        payload: json.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_FILTER_FAIL',
        payload: { message: error.message },
      });
    }
  };
}



export function getFilterProductsState(state) {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_FILTER_REQUEST' });
    try {
      const json = await axios.get('/api/products/state?state=' + state);

      dispatch({
        type: 'PRODUCTS_FILTER_SUCCESS',
        payload: json.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_FILTER_FAIL',
        payload: { message: error.message },
      });
    }
  };
}
export function getProductDetail(id) {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_REQUEST_DETAIL' });
    try {
      var json = await axios.get(`/api/products/${id}`);
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

export function createProduct(product, token) {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_CREATE_REQUEST' });
    try {
      const json = await axios.post('/api/admin/products/', product, {
        headers: {
          'auth-token': token,
        },
      });
      dispatch({
        type: 'PRODUCTS_CREATE_SUCCESS',
        payload: json.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_CREATE_FAIL',
        payload: '',
      });
    }
  };
}

export function updateProduct(product, token) {
  return async function(dispatch) {
    dispatch({ type: 'PRODUCTS_UPDATE_REQUEST' });
    try {
      const json = await axios.put(
        `/api/admin/products/${product.id}`,
        product,
        {
          headers: { 'auth-token': token },
        }
      );
      dispatch({
        type: 'PRODUCTS_UPDATE_SUCCESS',
        payload: json.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCTS_UPDATE_FAIL',
        payload: '', //{ status: error.response.status },
      });
    }
  };
}
export function OrderByAnyItem(payload) {
  return {
    type: 'ORDER_PRODUCTS_BY_ANY_ITEM',
    payload: payload,
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

export function putClearProducts() {
  return {
    type: 'CLEAR_PRODUCTS_STATE',
    payload: '',
  };
}